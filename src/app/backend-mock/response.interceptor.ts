import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { EmailCheckData, LoginData } from '../types';
import { StorageService } from './storage.service';
import { environment } from './../../environments/environment';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Emulates login API response.
    if (request?.url.includes(environment.api.login)) {
      const data = request.body as LoginData;
      const isSuccess = this.storage.emails.includes(data.email);
      this.storage.authStatus = isSuccess;
      return of(
        new HttpResponse({
          status: 200,
          body: { success: isSuccess },
        } as any)
      );
    }

    // Emulates logout API response.
    if (request?.url.includes(environment.api.logout)) {
      this.storage.authStatus = false;
      return of(
        new HttpResponse({
          status: 200,
          body: { success: true },
        } as any)
      );
    }

    // Emulates email uniqueness check API response.
    if (request?.url.includes(environment.api.checkEmail)) {
      const data = request.body as EmailCheckData;
      const isUnique = !this.storage.emails.includes(data.email);
      return of(
        new HttpResponse({
          status: 200,
          body: { success: isUnique },
        } as any)
      ).pipe(
        // 'delay' is used to emulate network delay
        delay(1500)
      );
    }

    // Emulates authentication check API response.
    if (request?.url.includes(environment.api.verifyAuth)) {
      // 'delay' is used to simulate network delay
      return of(
        new HttpResponse({
          status: 200,
          body: { success: this.storage.authStatus },
        } as any)
      );
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // NOTE: This code is for _demonstration_ only!
        // It is used to enable demonstration of login validation
        if (event instanceof HttpResponse && request.url?.includes(environment.api.signUp)) {
          const { email } = event.body;
          this.storage.addEmail(email);
        }
      }),
    );
  }
}
