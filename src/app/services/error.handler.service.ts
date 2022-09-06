import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { LocalStorageUtils } from './../utils/localstorage';

@Injectable()
export class ErrorHandlerService implements HttpInterceptor {
  // localStorageUtil = new LocalStorageUtils();

  constructor(private router: Router) {}

  // método para interceptar erros de request http
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            console.log('NÃO AUTORIZADO!!');
          }

          if (error.status === 403) {
            console.log('ACESSO NEGADO!!!');
          }
        }

        return throwError(error);
      })
    );
  }
}
