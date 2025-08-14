import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '../../core/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const activeToken = tokenService.checkToken();
  console.log("🚀 ~ authGuard ~ activeToken:", activeToken)

  if (tokenService.checkToken()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
