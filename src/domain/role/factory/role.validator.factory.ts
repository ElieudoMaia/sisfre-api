import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { Role } from '../entity/role';
import { RoleYupValidator } from '../validation/role.validator.yup';

export class RoleValidatorFactory {
  static create(): ValidatorInterface<Role> {
    return new RoleYupValidator();
  }
}
