import * as yup from 'yup';

import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { Role } from '@/domain/role/entity/role';

export class RoleYupValidator implements ValidatorInterface<Role> {
  validate(role: Role): void {
    try {
      const schema = yup.object().shape({
        id: yup
          .string()
          .typeError('id must be a string')
          .required('id is required'),
        name: yup
          .string()
          .typeError('name must be a string')
          .required('name is required')
          .max(50, 'name must be less than 50 characters')
      });
      schema.validateSync(role, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((err) => {
        role.notification.addError({
          message: err,
          context: 'Role'
        });
      });
    }
  }
}
