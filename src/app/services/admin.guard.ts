import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  const router = inject(Router);

  if (login.isLoggedIn() && login.getUSerRole() === 'ADMIN') {
    return true;
  }

  router.navigate(['login']);
  return false;
};
