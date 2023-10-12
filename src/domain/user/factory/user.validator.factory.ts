import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { User } from '../entity/user';
import { UserYupValidator } from '../validation/user.validator.yup';

export class UserValidatorFactory {
  static create(): ValidatorInterface<User> {
    return new UserYupValidator();
  }
}
