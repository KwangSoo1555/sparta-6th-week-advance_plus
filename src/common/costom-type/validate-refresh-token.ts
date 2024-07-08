export function ValidateRefreshTokenType(token: string): string {
    // Bearer 접두사를 제거.
    return token.replace(/^Bearer\s/, '');
  }