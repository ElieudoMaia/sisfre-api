import { ListRolesUseCase } from '@/application/usecases/role/list/list-roles.usecase';
import { ListRolesRepository } from '@/domain/role/repository/list-roles';
import { describe, expect, it, vi } from 'vitest';

const fakeRoles = [
  { id: 'any_id', name: 'any_name' },
  { id: 'other_id', name: 'other_name' }
];

const makeListRolesRepository = (): ListRolesRepository => ({
  listRoles: vi.fn().mockResolvedValue(fakeRoles)
});

type SutTypes = {
  sut: ListRolesUseCase;
  listRolesRepository: ListRolesRepository;
};

const makeSut = (): SutTypes => {
  const listRolesRepository = makeListRolesRepository();
  const sut = new ListRolesUseCase(listRolesRepository);
  return {
    sut,
    listRolesRepository
  };
};

describe('ListRoles', () => {
  it('should call listRoles repository with correct params', async () => {
    const { sut, listRolesRepository } = makeSut();
    await sut.execute();
    expect(listRolesRepository.listRoles).toHaveBeenCalledWith();
  });

  it('should throw if listRoles repository throws', async () => {
    const { sut, listRolesRepository } = makeSut();
    vi.spyOn(listRolesRepository, 'listRoles').mockRejectedValueOnce(
      new Error('any_error')
    );
    await expect(sut.execute()).rejects.toThrow(new Error('any_error'));
  });

  it('should return an empty list if listRoles repository returns an empty list', async () => {
    const { sut, listRolesRepository } = makeSut();
    vi.spyOn(listRolesRepository, 'listRoles').mockResolvedValueOnce([]);
    const result = await sut.execute();
    expect(result).toEqual([]);
  });

  it('should return a list of roles on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute();
    expect(result).toEqual(fakeRoles);
  });
});
