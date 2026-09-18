import { HttpInterceptorFn }from '@angular/common/http';
import { inject }from '@angular/core';

import { AuthService } from '../../features/user/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (request, next)=> {

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

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
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(()=> error);
    })
  );
};
