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

  const excludedUrls = [
    '/auth/refresh',
    '/auth/logout',
    '/auth/me',
    '/auth/login',
  ];

  const shouldSkip = excludedUrls.some((url) => req.url.includes(url));

  return next(req).pipe(
    catchError((err) => {
      if (
        err instanceof HttpErrorResponse &&
        err.status === 401 &&
        !shouldSkip
      ) {
        return authService.refreshToken().pipe(
          switchMap(() => next(req)),
          catchError((refreshErr) => {
            // Očisti samo stanje, bez dodatnih zahteva!
            authService.clearSession(); // vidi ispod
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
