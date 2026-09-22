export interface JwtPayload {
  sub: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  exp: number;
}
