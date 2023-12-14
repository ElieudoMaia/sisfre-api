export type LoginUseCaseInputDTO = {
  email: string;
  password: string;
};

export type LoginUseCaseOutputDTO = {
  accessToken: string;
};
