import { JwtAdapter } from '@/infrastructure/user/criptography/jwt-adapter';

export const makeJwtAdapter = (): JwtAdapter => {
  const secret = process.env.JWT_SECRET ?? 'secret';
  return new JwtAdapter(secret);
};
