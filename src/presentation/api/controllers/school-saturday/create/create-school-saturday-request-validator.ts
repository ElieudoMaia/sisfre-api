/* eslint-disable @typescript-eslint/no-explicit-any */
import { DayOfWeek } from '@/domain/school-saturday/entity/school-saturday';
import * as yup from 'yup';

export class CreateSchoolSaturdayRequestValidator {
  async validate(data: any) {
    const validationSchema = this.getValidationSchema();
    return await validationSchema.validate(data, {
      abortEarly: false
    });
  }

  private readonly getValidationSchema = () => {
    const dayOfWeekValues = Object.values(DayOfWeek);

    return yup.object().shape({
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
        .typeError('dayOfWeek must be type of string')
        .trim()
        .oneOf(dayOfWeekValues)
        .required('dayOfWeek is required')
    });
  };
}
