import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCookieService } from '../../features/user/services/auth-cookie.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authCookieService = inject(AuthCookieService);
  const router = inject(Router);

  const role = authCookieService.isAdmin();

  if (authCookieService.isAdmin()) {
    return true;
  }

  router.navigate(['/ticket-board-page']);
  return false;
};
