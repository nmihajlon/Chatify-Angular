import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environtment/environment.develop';
import {
  BehaviorSubject,
  catchError,
  switchMap,
  tap,
  throwError,
  of,
} from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null | undefined>(
    undefined
  );
  currentUser$ = this.currentUserSubject.asObservable();

  /**
   * Login i automatski fetch-uje trenutnog korisnika
   */
  login(user: any) {
    return this.httpClient
      .post(environment.apiUrl + 'auth/login', user, {
        withCredentials: true,
      })
      .pipe(
        switchMap(() => this.fetchCurrentUser()) // koristi switchMap, ne subscribe!
      );
  }

  /**
   * Registracija novog korisnika
   */
  register(newUser: any) {
    return this.httpClient.post(environment.apiUrl + 'auth/register', newUser);
  }

  /**
   * Samo ako vec imamo korisnika u memoriji — vraćamo observable.
   * Inace: greska.
   */
  getCurrentUser() {
    const user = this.currentUserSubject.value;

    if (user === undefined) {
      return throwError(() => new Error('User not resolved yet'));
    } else if (user === null) {
      return throwError(() => new Error('User is not authenticated'));
    } else {
      return of(user);
    }
  }

  /**
   * Poziva backend za auth/me i postavlja user-a.
   */
  fetchCurrentUser() {
    return this.httpClient
      .get<User>(environment.apiUrl + 'auth/me', { withCredentials: true })
      .pipe(
        tap((user: User) => this.currentUserSubject.next(user)),
        catchError((err) => {
          this.currentUserSubject.next(null);
          return throwError(() => err);
        })
      );
  }

  /**
   * Logout sa servera + ciscenje local state-a
   */
  logout() {
    return this.httpClient
      .post(environment.apiUrl + 'auth/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => this.clearSession()),
        catchError((err) => {
          this.clearSession(); // fallback ako backend baci 401
          return throwError(() => err);
        })
      );
  }

  /**
   * Osvjezava token
   */
  refreshToken() {
    return this.httpClient.post(
      `${environment.apiUrl}auth/refresh`,
      {},
      { withCredentials: true }
    );
  }

  /**
   * Ručno ciscenje sesije
   */
  clearSession() {
    this.currentUserSubject.next(null);
  }
}
