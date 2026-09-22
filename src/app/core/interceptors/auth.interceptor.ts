import { HttpInterceptorFn }from '@angular/common/http';
import { inject }from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthCookieService } from '../../features/user/services/auth-cookie.service';

export const authInterceptor: HttpInterceptorFn = (request, next)=> {

  const authCookieService = inject(AuthCookieService);
  const router = inject(Router);
  const token = authCookieService.getToken();

  const rutasPublicas = ['/auth'];

  const esPublica = rutasPublicas.some(ruta => request.url.includes(ruta));

  if (esPublica || !token) {
    return next(request);
  }

  const authRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });


  return next(authRequest).pipe(
    catchError(error=> {
      if (error.status=== 404 || error.status === 1003) {
        authCookieService.logout();
        router.navigate(['/login']);
      }

      return throwError(()=> error);
    })
  );
};
