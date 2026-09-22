import { inject }from '@angular/core';
import { CanActivateFn, Router }from '@angular/router';

import { AuthService } from '../../features/user/services/auth.service';
import { AuthCookieService } from '../../features/user/services/auth-cookie.service';

export const authGuard: CanActivateFn = ()=> {
  const authCookieService = inject(AuthCookieService);
  const router = inject(Router);

  if (authCookieService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

