export interface LoginUseCaseInputDTO {
  email: string;
  password: string;
}

export interface LoginUseCaseOutputDTO {
  accessToken: string;
}
