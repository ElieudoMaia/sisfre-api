import { UserRole } from '@/domain/user/entity/user';

export interface CreateUserUseCaseInputDTO {
  name: string;
  nameAbbreviation: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: UserRole;
}

export interface CreateUserUseCaseOutputDTO {
  id: string;
  name: string;
  nameAbbreviation: string;
  email: string;
  role: UserRole;
}
