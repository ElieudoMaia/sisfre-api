import { UserRole } from '@/domain/user/entity/user';

export interface UpdateUserUseCaseInputDTO {
  id: string;
  name: string;
  nameAbbreviation: string;
  email: string;
  role: UserRole;
}

export interface UpdateUserUseCaseOutputDTO {
  id: string;
  name: string;
  nameAbbreviation: string;
  email: string;
  role: UserRole;
}
