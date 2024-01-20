/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  id: yup
    .string()
    .typeError('id must be a string')
    .trim()
    .required('id is required')
    .uuid('id must be a valid uuid')
});

export class FindSemesterByIdRequestValidator {
  async validate(data: any) {
    return await validationSchema.validate(data, {
      abortEarly: false
    });
  }
}
