import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly _authService = inject(AuthService);

  /**
   * Returns default headers for API requests.
   * @param withAuth Whether to include Authorization header
   */
  getHeaders(withAuth = false): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    if (withAuth) {
      const token = this._authService.token();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return headers;
  }
}
