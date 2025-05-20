import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.fetchCurrentUser().pipe(
      map((user) => {
        console.log('User:', user);
        if (user) {
          this.router.navigate(['/chat']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        // Ako nije ulogovan ili nije moguće dobiti user-a, dozvoli login
        return of(true);
      })
    );
  }
}
