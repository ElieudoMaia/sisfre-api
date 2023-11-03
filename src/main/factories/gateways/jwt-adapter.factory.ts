import { JwtAdapter } from '@/infrastructure/user/criptography/jwt-adapter';

export const makeJwtAdapter = (): JwtAdapter => {
  const secret = 'temporarysecret';
  return new JwtAdapter(secret);
};
