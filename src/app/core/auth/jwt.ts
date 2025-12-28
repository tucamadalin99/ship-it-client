export interface JwtClaims {
  sub: string;
  iat: number;
  exp: number;
  roles?: string[];
  [key: string]: unknown;
}

function base64UrlEncode(input: string): string {
  // btoa expects Latin1; for ASCII JSON this is fine in our mock
  const b64 = btoa(input);
  return b64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function base64UrlDecode(input: string): string {
  const padLen = (4 - (input.length % 4)) % 4;
  const padded = input + '='.repeat(padLen);
  const b64 = padded.replaceAll('-', '+').replaceAll('_', '/');
  return atob(b64);
}

export function decodeJwtClaims(token: string): JwtClaims | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson);
    return payload as JwtClaims;
  } catch {
    return null;
  }
}

export function isJwtExpired(claims: JwtClaims, nowSec = Math.floor(Date.now() / 1000)): boolean {
  return typeof claims.exp === 'number' ? claims.exp <= nowSec : true;
}

// MOCK token generator (NOT cryptographically signed)
export function createMockJwt(claims: JwtClaims): string {
  const header = { alg: 'none', typ: 'JWT' };
  const headerPart = base64UrlEncode(JSON.stringify(header));
  const payloadPart = base64UrlEncode(JSON.stringify(claims));
  const signaturePart = ''; // alg=none mock
  return `${headerPart}.${payloadPart}.${signaturePart}`;
}
