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
    // '/auth/logout',
    // '/auth/login',
    // '/auth/me'
  ];

  const shouldSkip = excludedUrls.some((url) => req.url.includes(url));

  return next(req).pipe(
    catchError((err) => {
      console.log('Error in interceptor:', err.status, );
      if (
        err instanceof HttpErrorResponse &&
        err.status === 401 &&
        !shouldSkip
      ) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            console.log('USOOO Token refreshed successfully');
            
            return next(req);
          }),
          catchError((refreshErr) => {
            console.log('Token not refreshed successfully');
            console.log(refreshErr);
            authService.clearSession();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
