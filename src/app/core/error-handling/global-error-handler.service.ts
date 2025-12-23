import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService {
  private readonly _errorSubject$ = new Subject<HttpErrorResponse>();

  get errorSubject$(): Observable<HttpErrorResponse> {
    return this._errorSubject$.asObservable();
  }

  set errorSubject(value: HttpErrorResponse) {
    this._errorSubject$.next(value);
  }
}
