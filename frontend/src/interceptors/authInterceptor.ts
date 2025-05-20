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
          switchMap(() => {
            // ✔️ Nakon uspešnog refresh-a, samo retry originalni zahtev
            return next(req);
          }),
          catchError((refreshErr) => {
            // ❌ Refresh nije uspeo — briši sesiju i baci grešku
            authService.clearSession();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
