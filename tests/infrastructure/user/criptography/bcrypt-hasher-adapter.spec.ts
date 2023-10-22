import { BcryptHasherAdapter } from '@/infrastructure/user/criptography/bcrypt-hasher-adapter';
import bcrypt from 'bcrypt';
import { describe, expect, test, vi } from 'vitest';

vi.mock('bcrypt');

const makeSut = (): BcryptHasherAdapter => {
  return new BcryptHasherAdapter();
};

describe('BcryptAdapter', () => {
  test('Should call compare with correct values', async () => {
    const sut = makeSut();
    const compareSpy = vi.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut();
    vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      return true;
    });
    const isValid = await sut.compare('any_valid_value', 'any_valid_hash');
    expect(isValid).toBe(true);
  });

  test('Should return false when compare fails', async () => {
    const sut = makeSut();
    vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      return false;
    });
    const isValid = await sut.compare('any_value', 'any_hash');
    expect(isValid).toBe(false);
  });

  test('Should throw if compare throws', async () => {
    const sut = makeSut();
    vi.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error('any_error'));
    const promise = sut.compare('any_value', 'any_hash');
    await expect(promise).rejects.toThrow('any_error');
  });
});
