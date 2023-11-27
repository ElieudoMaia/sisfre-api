export type FindUserByIdInputDTO = {
  id: string;
};

export type FindUserByIdOutputDTO = {
  id: string;
  name: string;
  nameAbbreviation: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
