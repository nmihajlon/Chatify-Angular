import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environtment/environment.develop';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(user: any) {
    return this.httpClient
      .post(environment.apiUrl + 'auth/login', user, {
        withCredentials: true,
      })
      .pipe(tap(() => this.getCurrentUser().subscribe()));
  }

  register(newUser: any) {
    return this.httpClient.post(environment.apiUrl + 'auth/register', newUser);
  }

  getCurrentUser() {
    if (this.currentUserSubject.value !== null) {
      return this.currentUserSubject.asObservable();
    } else {
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
  }

  logout() {
    return this.httpClient
      .post(environment.apiUrl + 'auth/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
        })
      );
  }

  refreshToken() {
    return this.httpClient
      .post(`${environment.apiUrl}auth/refresh`, {}, { withCredentials: true });
  }
}
