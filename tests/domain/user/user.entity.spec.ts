import { Role } from '@/domain/role/entity/role';
import { User, UserEntityProps } from '@/domain/user/entity/user';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

const makeFakeUserProps = (): UserEntityProps => ({
  id: fake.uuid(),
  name: fake.name(),
  nameAbbreviation: 'ABV',
  email: fake.email(),
  password: fake.password(),
  createdAt: new Date(),
  updatedAt: new Date()
});

const makeFakeRole = (): Role => {
  return new Role({
    id: fake.uuid(),
    name: fake.name()
  });
};

describe('User Entity', () => {
  it('should create a new id, createdAt and updatedAt when they are not provided', () => {
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

  it('should change role correctly', () => {
    const fakeUserProps = makeFakeUserProps();
    const user = new User(fakeUserProps);
    expect(user.role).toBeUndefined();

    const role1 = makeFakeRole();
    user.changeRole(role1);
    expect(user.role).toBeDefined();
    expect(user.role).toBe(role1);

    const role2 = makeFakeRole();
    user.changeRole(role2);
    expect(user.role).toBeDefined();
    expect(user.role).toBe(role2);
  });

  it('should create a user correctly', () => {
    const fakeUserProps = makeFakeUserProps();
    const user = new User(fakeUserProps);
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(fakeUserProps.id);
    expect(user.name).toBe(fakeUserProps.name);
    expect(user.email).toBe(fakeUserProps.email);
    expect(user.password).toBe(fakeUserProps.password);
  });
});
