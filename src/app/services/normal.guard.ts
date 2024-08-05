import { CanActivateFn, Router, ROUTES } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';
export const normalGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  const router = inject(Router);


  if (login.isLoggedIn() && login.getUSerRole() === 'NORMAL') {
    return true;
  }
  router.navigate(['login']);
  return false;
};
