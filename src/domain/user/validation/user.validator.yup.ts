import * as yup from 'yup';

import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { User } from '../entity/user';

export class UserYupValidator implements ValidatorInterface<User> {
  validate(user: User): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().typeError('id must be a string').notRequired(),
        name: yup
          .string()
          .typeError('name must be a string')
          .required('name is required')
          .max(255, 'name must be less than 255 characters'),
        nameAbbreviation: yup
          .string()
          .typeError('nameAbbreviation must be a string')
          .required('nameAbbreviation is required')
          .matches(
            /^[A-Z]{3,10}$/,
            'nameAbbreviation must be in the format [A-Z] and have between 3 and 10 characters'
          )
          .max(10, 'nameAbbreviation must be less than 10 characters'),
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
          .max(64, 'password must be less than 64 characters'),
        isActive: yup
          .boolean()
          .typeError('isActive must be a boolean')
          .required('isActive is required'),
        isCoordinator: yup
          .boolean()
          .typeError('isCoordinator must be a boolean')
          .required('isCoordinator is required')
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
