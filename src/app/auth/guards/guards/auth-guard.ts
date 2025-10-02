import { CanActivateFn , Router} from '@angular/router';
import {AuthService} from "src/app/services/auth/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isUserAuthenticated) {
    router.navigateByUrl('/log-in');
  }

  return authService.isUserAuthenticated;
};
