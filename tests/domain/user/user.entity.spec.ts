import { User } from '@/domain/user/entity/user';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

describe('User Entity', () => {
  it('should throw an error when id is empty', () => {
    expect(() => {
      new User('', 'name', 'email@mail.com', 'password');
    }).toThrowError('id is required');
  });

  it('should validate name correctly', () => {
    expect(() => {
      new User('id', '', 'email@mail.com', 'password');
    }).toThrowError('name is required');
    expect(() => {
      new User('id', fake.random(256), 'email@mail.com', 'password');
    }).toThrowError('name must be less than 255 characters');
  });

  it('should validate email correctly', () => {
    expect(() => {
      new User('id', 'name', '', 'password');
    }).toThrowError('email is required');
    expect(() => {
      new User('id', 'name', fake.random(256), 'password');
    }).toThrowError('email must be less than 255 characters');
    expect(() => {
      new User('id', 'name', 'invalid_useremail', 'password');
    }).toThrowError('email is invalid');
  });

  it('should validate password correctly', () => {
    expect(() => {
      new User('id', 'name', 'mail@mail.com', '');
    }).toThrowError('password is required');
    expect(() => {
      new User('id', 'name', 'mail@mail.com', fake.random(65));
    }).toThrowError('password must be less than 64 characters');
  });

  it('should create a user correctly', () => {
    const user = new User('id', 'name', 'mail@anymail.com', 'password');
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('id');
    expect(user.name).toBe('name');
    expect(user.email).toBe('mail@anymail.com');
    expect(user.password).toBe('password');
  });
});
