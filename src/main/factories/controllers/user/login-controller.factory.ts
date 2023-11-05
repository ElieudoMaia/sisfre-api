import { LoginRequestValidator } from '@/presentation/api/controllers/user/login/login-request-validator';
import { LoginController } from '@/presentation/api/controllers/user/login/login.controller';
import { makeLoginUseCase } from '../../usecases/user/login-usecase.factory';

export const makeLoginController = (): LoginController => {
  return new LoginController(new LoginRequestValidator(), makeLoginUseCase());
};
