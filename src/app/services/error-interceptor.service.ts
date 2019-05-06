import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
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
            return throwError('Unauthorized');
          }
          const error = err.error;
          let modelState = '';
          if ( error && typeof(error) === 'object') {
            for (const key in error) {
              if (error[key]) {
                modelState += error[key] + '\n';
              }
            }
            console.log('Err', modelState);
            return throwError(modelState);
          }
          return throwError(error);
        }
      })
    );
  }
}
export const ErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptorService,
  multi: true
};
