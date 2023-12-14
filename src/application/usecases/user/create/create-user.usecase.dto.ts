import { UserRole } from '@/domain/user/entity/user';

export type CreateUserUseCaseInputDTO = {
  name: string;
  nameAbbreviation: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: UserRole;
};

export type CreateUserUseCaseOutputDTO = {
  id: string;
  name: string;
  nameAbbreviation: string;
  email: string;
  role: UserRole;
};
