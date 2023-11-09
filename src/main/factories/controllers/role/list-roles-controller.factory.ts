import { ListRolesController } from '@/presentation/api/controllers/role/list/list-roles.controller';
import { makeListRolesUseCase } from '../../usecases/role/list-roles-usecase.factory';

export const makeListRolesController = (): ListRolesController => {
  const listRolesUseCase = makeListRolesUseCase();
  return new ListRolesController(listRolesUseCase);
};
