import { UserRole } from '@/domain/user/entity/user';

export type UpdateUserUseCaseInputDTO = {
  id: string;
  name: string;
  nameAbbreviation: string;
  email: string;
  role: UserRole;
};

export type UpdateUserUseCaseOutputDTO = {
  id: string;
  name: string;
  nameAbbreviation: string;
  email: string;
  role: UserRole;
};
