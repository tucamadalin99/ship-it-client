import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalErrorHandlerService } from './global-error-handler.service';

export function errorHandlingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const globalErrorHandler = inject(GlobalErrorHandlerService);

  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        // status is here (e.g. 0 for network/CORS, 401, 403, 500...)
        if (err.status >= 500 || err.status === 0) {
          globalErrorHandler.errorSubject = err;
        }
      }
      return throwError(() => err);
    }),
  );
}
