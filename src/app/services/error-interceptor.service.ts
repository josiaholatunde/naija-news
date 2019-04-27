import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return throwError(err.statusText);
          }
          const error = err.error;
          return throwError(error);
        }
      })
    );
  }
}
