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
    'auth/refresh',
    'auth/login',
    'auth/logout',
  ];
  const shouldSkip = excludedUrls.some((url) => req.url.includes(url));

  if (shouldSkip) {
    return next(req); // 👈 Ne radi ništa za te URL-ove
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            return next(req); // Retry original request
          }),
          catchError((refreshErr) => {
            console.log('Refresh token failed:', refreshErr);
            authService.clearSession();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
