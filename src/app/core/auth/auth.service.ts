import { computed, Injectable, signal } from '@angular/core';
import { createMockJwt, decodeJwtClaims, JwtClaims } from './jwt';

const STORAGE_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _token = signal<string | null>(localStorage.getItem(STORAGE_KEY));

  readonly token = computed(() => this._token());

  readonly jwtClaims = computed(() => {
    const token = this._token();
    const claims = decodeJwtClaims(token as string);

    return claims ?? null;
  });

  readonly isAuth = computed(() => {
    const token = this._token();
    if (!token) return false;

    const claims = decodeJwtClaims(token);
    if (!claims) return false;

    return true;
  });

  login(): void {
    const now = Math.floor(Date.now() / 1000); //current date when login() is called
    const mockClaims: JwtClaims = {
      sub: 'dorica',
      iat: now,
      exp: now + 60 * 60,
    };

    const mockJwt = createMockJwt(mockClaims);
    localStorage.setItem(STORAGE_KEY, mockJwt);
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
