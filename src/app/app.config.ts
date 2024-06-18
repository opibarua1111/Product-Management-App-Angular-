import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorService } from './_services/http-interceptor.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    importProvidersFrom(
      BrowserAnimationsModule, // required for Toastr
      ToastrModule.forRoot({
        timeOut: 3000, // Duration of the toast
        positionClass: 'custom-toast-top-right', // Position of the toast
        preventDuplicates: true, // Prevent duplicate toasts
        closeButton: true, // Display close button
        progressBar: true, // Display progress bar
      }),
      FormsModule,
      ReactiveFormsModule
    )
  ]
};
