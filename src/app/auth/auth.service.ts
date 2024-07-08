// auth.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import {isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Code exécuté uniquement côté navigateur
      return localStorage.getItem('token') !== null;
    }
    return false; // Gestion alternative pour SSR ou environnement non-browser
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.ebankApiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Stockez le token JWT dans localStorage
      })
    );
  }

  logout(): void {
    // Supprime le token d'authentification du localStorage lors de la déconnexion
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.decodeJwt(token); // Décoder le token JWT pour obtenir le payload
      return payload ? payload.username : null; // Retournez le nom d'utilisateur depuis le payload du token
    }
    return null; // Retournez null si aucun token n'est présent ou s'il n'y a pas de champ 'username'
  }

  private decodeJwt(token: string): any {
    const base64Url = token.split('.')[1]; // Récupère la deuxième partie du token JWT (le payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Remplace les caractères spéciaux pour décoder correctement
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); // Décodage du payload Base64 en JSON
    
    return JSON.parse(jsonPayload); // Parse le JSON et retourne l'objet résultant
  }
  
}
