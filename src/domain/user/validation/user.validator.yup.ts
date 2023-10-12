import * as yup from 'yup';

import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { User } from '../entity/user';

export class UserYupValidator implements ValidatorInterface<User> {
  validate(user: User): void {
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
          .max(255, 'name must be less than 255 characters'),
        email: yup
          .string()
          .typeError('email must be a string')
          .required('email is required')
          .max(255, 'email must be less than 255 characters')
          .email('email is invalid'),
        password: yup
          .string()
          .typeError('password must be a string')
          .required('password is required')
          .max(64, 'password must be less than 64 characters')
      });
      schema.validateSync(user, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((err) => {
        user.notification.addError({
          message: err,
          context: 'User'
        });
      });
    }
  }
}
