import { LoginController } from '@/presentation/api/controllers/user/login.controller';
import { makeLoginUseCase } from '../../usecases/user/login-usecase.factory';

export const makeLoginController = (): LoginController => {
  return new LoginController(makeLoginUseCase());
};
