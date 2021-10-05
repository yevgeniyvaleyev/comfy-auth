import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APP_CONFIG } from '../config/tokens';
import { AppConfig } from '../types/app-config';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {

        // This code is for demonstration only!
        // It is used to enable demonstration of login validation
        if (event instanceof HttpResponse && event.url?.includes('/users')) {
          const { email } = event.body;
          const { recognizedEmails } = this.config.storageKeys;
          const recognisedEmails = localStorage.getItem(recognizedEmails);
          const parsedRecognisedEmails = !!recognisedEmails ? recognisedEmails.split(',') : [];

          localStorage.setItem(recognizedEmails, [...parsedRecognisedEmails, email].join(','));
        }
      }));
  }
}
