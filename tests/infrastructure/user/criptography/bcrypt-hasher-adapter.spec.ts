import { BcryptHasherAdapter } from '@/infrastructure/user/criptography/bcrypt-hasher-adapter';
import bcrypt from 'bcrypt';
import { describe, expect, it, vi } from 'vitest';

const makeSut = (): BcryptHasherAdapter => {
  const salt = 12;
  return new BcryptHasherAdapter(salt);
};

const salt = 12;

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    it('Should call compare with correct values', async () => {
      const sut = makeSut();
      const compareSpy = vi.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    it('Should return true when compare succeeds', async () => {
      const sut = makeSut();
      vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        return true;
      });
      const isValid = await sut.compare('any_valid_value', 'any_valid_hash');
      expect(isValid).toBe(true);
    });

    it('Should return false when compare fails', async () => {
      const sut = makeSut();
      vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        return false;
      });
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBe(false);
    });

    it('Should throw if compare throws', async () => {
      const sut = makeSut();
      vi.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error('any_error'));
      const promise = sut.compare('any_value', 'any_hash');
      await expect(promise).rejects.toThrow('any_error');
    });
  });

  describe('hash()', () => {
    it('Should call hash with correct values', async () => {
      const sut = makeSut();
      const hashSpy = vi.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    it('Should return a valid hash on hash success', async () => {
      const sut = makeSut();
      vi.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        return 'hashed_value';
      });
      const hash = await sut.hash('any_value');
      expect(hash).toBe('hashed_value');
    });

    it('Should throw if hash throws', async () => {
      const sut = makeSut();
      vi.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.hash('any_value');
      await expect(promise).rejects.toThrow();
    });
  });
});
