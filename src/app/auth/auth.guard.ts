// auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Utilisateur authentifié
    return true; // Laisser l'utilisateur accéder à la route demandée
  } else {
    // Utilisateur non authentifié, rediriger vers la page de connexion
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
};
