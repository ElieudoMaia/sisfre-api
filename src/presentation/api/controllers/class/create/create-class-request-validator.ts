/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

export class CreateClassRequestValidator {
  async validate(data: any) {
    const validationSchema = this.getValidationSchema();
    return validationSchema.validate(data, {
      abortEarly: false
    });
  }

  private readonly getValidationSchema = () => {
    return yup.object().shape({
      shift: yup
        .string()
        .typeError('shift must be a string')
        .trim()
        .oneOf(
          ['MORNING', 'AFTERNOON', 'NIGHT'],
          'shift must be one of MORNING, AFTERNOON or NIGHT'
        )
        .required('shift is required'),
      coursePeriod: yup
        .number()
        .typeError('coursePeriod must be a number')
        .integer('coursePeriod must be an integer')
        .positive('coursePeriod must be a positive number')
        .required('coursePeriod is required'),
      courseId: yup
        .string()
        .typeError('courseId must be a string')
        .trim()
        .uuid('courseId must be a valid uuid')
        .required('courseId is required'),
      semesterId: yup
        .string()
        .typeError('semesterId must be a string')
        .trim()
        .uuid('semesterId must be a valid uuid')
        .required('semesterId is required')
    });
  };
}
