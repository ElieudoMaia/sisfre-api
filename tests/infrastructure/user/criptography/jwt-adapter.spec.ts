import { TokenGeneratorPayload } from '@/domain/user/gateway/access-token-generator';
import { JwtAdapter } from '@/infrastructure/user/criptography/jwt-adapter';
import jwt from 'jsonwebtoken';
import { describe, expect, test, vi } from 'vitest';
import { fake } from '../../../utils/fake-data-generator';

interface SutTypes {
  sut: JwtAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret');
  return { sut };
};

const makeFakePayload = (): TokenGeneratorPayload => ({
  id: fake.uuid(),
  email: fake.email(),
  name: fake.name()
});

describe('JwtAdapter', () => {
  describe('generate()', () => {
    test('Should call generate with correct values', async () => {
      const { sut } = makeSut();
      const signSpy = vi.spyOn(jwt, 'sign');
      const payload = makeFakePayload();
      await sut.generate(payload);
      expect(signSpy).toHaveBeenCalledWith(payload, 'secret', {
        expiresIn: '1d'
      });
    });

    test('Should return a token on sign success', async () => {
      const { sut } = makeSut();
      vi.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        return 'fake_token';
      });
      const accessToken = await sut.generate(makeFakePayload());
      expect(accessToken).toBe('fake_token');
    });

    test('Should throws if generate throws', async () => {
      const { sut } = makeSut();
      vi.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error('any_error');
      });
      const promise = sut.generate(makeFakePayload());
      await expect(promise).rejects.toThrow('any_error');
    });
  });

  describe('decrypt()', () => {
    test('Should call verify with correct values', async () => {
      const { sut } = makeSut();
      const verifySpy = vi
        .spyOn(jwt, 'verify')
        .mockImplementationOnce(() => {});
      sut.decrypt('any_token');
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
    });

    test('Should return a value on verify success', async () => {
      const { sut } = makeSut();
      vi.spyOn(jwt, 'verify').mockImplementationOnce(
        () => 'fake_resolved_value'
      );
      const value = sut.decrypt('any_token');
      expect(value).toBe('fake_resolved_value');
    });

    test('Should throws if verify throws', () => {
      const { sut } = makeSut();
      vi.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error('any_error');
      });
      expect(() => sut.decrypt('any_token')).toThrow('any_error');
    });
  });
});
