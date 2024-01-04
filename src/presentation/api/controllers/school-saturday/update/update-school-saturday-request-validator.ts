/* eslint-disable @typescript-eslint/no-explicit-any */
import { DayOfWeek } from '@/domain/school-saturday/entity/school-saturday';
import * as yup from 'yup';

export class UpdateSchoolSaturdayRequestValidator {
  async validate(data: any) {
    const validationSchema = this.getValidationSchema();
    return await validationSchema.validate(data, {
      abortEarly: false
    });
  }

  private readonly getValidationSchema = () => {
    const dayOfWeekValues = Object.values(DayOfWeek);

    return yup.object().shape({
      id: yup
        .string()
        .trim()
        .uuid('id must be a valid uuid')
        .required('id is required'),
      date: yup
        .string()
        .trim()
        .test(
          'date',
          'date must be a valid date',
          (value: any) => new Date(value).toString() !== 'Invalid Date'
        )
        .typeError('date must be type of Date')
        .required('date is required'),
      dayOfWeek: yup
        .string()
        .trim()
        .oneOf(dayOfWeekValues)
        .required('dayOfWeek is required')
    });
  };
}
