import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenService } from '../services/token.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  
  if (req.url.includes('/api/auth')) {
    return next(req);
  } else {
    const validToken = tokenService.hasValidToken();
    console.log("🚀 ~ authInterceptor ~ validToken:", validToken)
    if (!tokenService.hasValidToken()) {
      return next(req);
    }

    return next(req.clone({
      setHeaders: {
      Authorization: `Bearer ${tokenService.getToken()}`
      }
  }));
  }
};
