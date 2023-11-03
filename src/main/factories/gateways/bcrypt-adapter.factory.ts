import { BcryptHasherAdapter } from '@/infrastructure/user/criptography/bcrypt-hasher-adapter';

export const makeBcryptHasherAdapter = (): BcryptHasherAdapter => {
  const salt = 12;
  return new BcryptHasherAdapter(salt);
};
