import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        // Proveri da li je zahtev već pokušao refresh (da ne uđe u petlju)
        if (req.url.endsWith('/auth/refresh') || req.url.endsWith('/auth/login')) {
          // Refresh neuspešan → logout
          authService.logout().subscribe();
          return throwError(() => err);
        }

        // Pokušaj refresh tokena
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Pokušaj ponovo originalni zahtev
            return next(req);
          }),
          catchError((refreshErr) => {
            // Ako ni refresh nije uspeo → logout
            authService.logout().subscribe();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
