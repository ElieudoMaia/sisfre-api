import { User, UserEntityProps, UserRole } from '@/domain/user/entity/user';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

const makeFakeUserProps = (): UserEntityProps => ({
  id: fake.uuid(),
  name: fake.name(),
  nameAbbreviation: 'ABV',
  email: fake.email(),
  password: fake.password(),
  role: 'ADMINISTRATOR',
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('User Entity', () => {
  it('should create a new id, createdAt and updatedAt, isActive and isCoordinator when they are not provided', () => {
    const fakeUserProps = makeFakeUserProps();
    fakeUserProps.id = undefined;
    const user = new User(fakeUserProps);
    expect(user.id).not.toBe('');
    expect(user.id).toBeDefined();
    expect(user.id).toBeTypeOf('string');
    expect(user.createdAt).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeDefined();
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.isActive).toBeDefined();
    expect(user.isActive).toBe(true);
    expect(user.isCoordinator).toBeDefined();
    expect(user.isCoordinator).toBe(false);
  });

  it('should validate name correctly', () => {
    const fakeUserProps = makeFakeUserProps();
    expect(() => {
      fakeUserProps.name = '';
      new User(fakeUserProps);
    }).toThrowError('name is required');
    expect(() => {
      fakeUserProps.name = fake.random(256);
      new User(fakeUserProps);
    }).toThrowError('name must be less than 255 characters');
  });

  it('should validate nameAbbreviation correctly', () => {
    const fakeUserProps = makeFakeUserProps();
    expect(() => {
      fakeUserProps.nameAbbreviation = '';
      new User(fakeUserProps);
    }).toThrowError('nameAbbreviation is required');
    expect(() => {
      fakeUserProps.nameAbbreviation = fake.random(11);
      new User(fakeUserProps);
    }).toThrowError('nameAbbreviation must be less than 10 characters');
    expect(() => {
      fakeUserProps.nameAbbreviation = 'invalid';
      new User(fakeUserProps);
    }).toThrowError(
      'nameAbbreviation must be in the format [A-Z] and have between 3 and 10 characters'
    );
  });

  it('should validate email correctly', () => {
    const fakeUserProps = makeFakeUserProps();
    expect(() => {
      fakeUserProps.email = '';
      new User(fakeUserProps);
    }).toThrowError('email is required');
    expect(() => {
      fakeUserProps.email = fake.random(256);
      new User(fakeUserProps);
    }).toThrowError('email must be less than 255 characters');
    expect(() => {
      fakeUserProps.email = 'invalid';
      new User(fakeUserProps);
    }).toThrowError('email is invalid');
  });

  it('should validate password correctly', () => {
    const fakeUserProps = makeFakeUserProps();
    expect(() => {
      fakeUserProps.password = '';
      new User(fakeUserProps);
    }).toThrowError('password is required');
    expect(() => {
      fakeUserProps.password = fake.random(65);
      new User(fakeUserProps);
    }).toThrowError('password must be less than 64 characters');
  });

  it('should validate role correctly', () => {
    const fakeUserProps = makeFakeUserProps();
    expect(() => {
      fakeUserProps.role = 'invalid' as UserRole;
      new User(fakeUserProps);
    }).toThrowError(
      'role must be one of ADMINISTRATOR, COORDINATOR or TEACHER'
    );
  });

  it('should create a user correctly', () => {
    const fakeUserProps = makeFakeUserProps();
    const user = new User(fakeUserProps);
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(fakeUserProps.id);
    expect(user.name).toBe(fakeUserProps.name);
    expect(user.email).toBe(fakeUserProps.email);
    expect(user.password).toBe(fakeUserProps.password);
    expect(user.createdAt).toBe(fakeUserProps.createdAt);
    expect(user.updatedAt).toBe(fakeUserProps.updatedAt);
    expect(user.isActive).toBe(true);
    expect(user.isCoordinator).toBe(false);

    fakeUserProps.isActive = false;
    fakeUserProps.role = 'COORDINATOR';
    const user2 = new User(fakeUserProps);
    expect(user2).toBeInstanceOf(User);
    expect(user2.id).toBe(fakeUserProps.id);
    expect(user2.name).toBe(fakeUserProps.name);
    expect(user2.email).toBe(fakeUserProps.email);
    expect(user2.password).toBe(fakeUserProps.password);
    expect(user2.createdAt).toBe(fakeUserProps.createdAt);
    expect(user2.updatedAt).toBe(fakeUserProps.updatedAt);
    expect(user2.isActive).toBe(false);
    expect(user2.isCoordinator).toBe(true);
  });
});
