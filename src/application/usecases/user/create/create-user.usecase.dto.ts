export interface CreateUserUseCaseInputDTO {
  name: string;
  nameAbbreviation: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  roleId: string;
}

export interface CreateUserUseCaseOutputDTO {
  id: string;
  name: string;
  nameAbbreviation: string;
  email: string;
  roleId: string;
}
