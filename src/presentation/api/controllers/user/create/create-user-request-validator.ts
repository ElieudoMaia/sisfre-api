/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('name must be a string')
    .trim()
    .required('name is required')
    .max(255, 'name must be less than 255 characters'),
  nameAbbreviation: yup
    .string()
    .typeError('nameAbbreviation must be a string')
    .trim()
    .required('nameAbbreviation is required')
    .matches(
      /^[A-Z]{3,10}$/,
      'nameAbbreviation must be in the format [A-Z] and have between 3 and 10 characters'
    )
    .max(10, 'nameAbbreviation must be less than 10 characters'),
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
    .max(64, 'password must be less than 64 characters'),
  passwordConfirmation: yup
    .string()
    .typeError('passwordConfirmation must be a string')
    .trim()
    .required('passwordConfirmation is required')
    .max(64, 'passwordConfirmation must be less than 64 characters')
    .oneOf([yup.ref('password')], 'passwords does not match'),
  roleId: yup
    .string()
    .typeError('roleId must be a string')
    .trim()
    .required('roleId is required')
    .uuid('roleId has an invalid format')
});

export class CreateUserRequestValidator {
  async validate(data: any) {
    return await validationSchema.validate(data, {
      abortEarly: false
    });
  }
}
