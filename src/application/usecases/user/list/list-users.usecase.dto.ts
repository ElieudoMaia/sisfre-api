import { UserRole } from '@/domain/user/entity/user';

export type ListUsersUseCaseInputDTO = {
  pageNumber?: number;
  pageSize?: number;
};

export type ListUsersUseCaseOutputDTO = {
  users: {
    id: string;
    name: string;
    nameAbbreviation: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }[];
  quantity: number;
  pageNumber: number;
  pageSize?: number;
};
