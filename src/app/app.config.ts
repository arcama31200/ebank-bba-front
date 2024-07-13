import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appHttpInterceptor } from './interceptor/app-http.interceptor';
import { LOCALSTORAGE } from './auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptors([appHttpInterceptor])), { provide: LOCALSTORAGE, useFactory: () => (typeof window !== 'undefined' ? window.localStorage : null)}]
};
