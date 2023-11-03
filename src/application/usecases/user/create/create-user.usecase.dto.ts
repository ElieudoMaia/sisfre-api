export interface CreateUserUseCaseInputDTO {
  name: string;
  nameAbreviation: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  roleId: string;
}

export interface CreateUserUseCaseOutputDTO {
  id: string;
  name: string;
  nameAbreviation: string;
  email: string;
  roleId: string;
}
