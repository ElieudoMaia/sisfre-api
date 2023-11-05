/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .typeError('email must be a string')
    .trim()
    .required('email is required')
    .max(255, 'email must be less than 255 characters')
    .email('email is invalid'),
  password: yup
    .string()
    .typeError('password must be a string')
    .trim()
    .required('password is required')
    .max(64, 'password must be less than 64 characters')
});

export class LoginRequestValidator {
  async validate(data: any) {
    return await validationSchema.validate(data, {
      abortEarly: false
    });
  }
}
