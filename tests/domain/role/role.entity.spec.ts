import { Role, RoleEntityProps } from '@/domain/role/entity/role';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

const makeFakeRoleProps = (): RoleEntityProps => ({
  id: 'any_id',
  name: 'any_name',
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('RoleEntity', () => {
  it('should create a new id, createdAt and updatedAt when they are not provided', () => {
    const fakeUserProps = makeFakeRoleProps();
    fakeUserProps.id = undefined;
    const user = new Role(fakeUserProps);
    expect(user.id).not.toBe('');
    expect(user.id).toBeDefined();
    expect(user.id).toBeTypeOf('string');
    expect(user.createdAt).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeDefined();
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate name correctly', () => {
    const fakeUserProps = makeFakeRoleProps();
    expect(() => {
      fakeUserProps.name = '';
      new Role(fakeUserProps);
    }).toThrowError('name is required');
    expect(() => {
      fakeUserProps.name = fake.random(51);
      new Role(fakeUserProps);
    }).toThrowError('name must be less than 50 characters');
  });

  it('should create a new RoleEntity instance', () => {
    const fakeUserProps = makeFakeRoleProps();
    const user = new Role(fakeUserProps);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(Role);
    expect(user.id).toBe(fakeUserProps.id);
    expect(user.name).toBe(fakeUserProps.name);
    expect(user.createdAt).toBe(fakeUserProps.createdAt);
    expect(user.updatedAt).toBe(fakeUserProps.updatedAt);
  });
});
