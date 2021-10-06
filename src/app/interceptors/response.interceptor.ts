import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // NOTE: This code is for _demonstration_ only!
        // It is used to enable demonstration of login validation
        if (event instanceof HttpResponse && event.url?.includes('/users')) {
          const { email } = event.body;
          this.storage.addEmail(email);
        }
      })
    );
  }
}
