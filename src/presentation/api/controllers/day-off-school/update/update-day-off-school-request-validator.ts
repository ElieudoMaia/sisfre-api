/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

export class UpdateDayOffSchoolRequestValidator {
  async validate(data: any) {
    const validationSchema = this.getValidationSchema();
    return await validationSchema.validate(data, {
      abortEarly: false
    });
  }

  private readonly getValidationSchema = () => {
    return yup.object().shape({
      id: yup
        .string()
        .trim()
        .uuid('id must be a valid uuid')
        .required('id is required'),
      description: yup
        .string()
        .trim()
        .typeError('description must be a string')
        .required('description is required'),
      type: yup
        .string()
        .trim()
        .typeError('type must be a string')
        .required('type is required'),
      dateBegin: yup
        .date()
        .typeError('dateBegin must be a date')
        .required('dateBegin is required'),
      dateEnd: yup.date().typeError('dateEnd must be a date')
    });
  };
}
