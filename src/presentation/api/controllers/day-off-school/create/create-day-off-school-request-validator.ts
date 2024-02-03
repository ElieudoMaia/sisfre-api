/* eslint-disable @typescript-eslint/no-explicit-any */
import { DayOffSchoolType } from '@/domain/day-off-school/entity/day-off-school';
import * as yup from 'yup';

export class CreateDayOffSchoolRequestValidator {
  async validate(data: any) {
    const validationSchema = this.getValidationSchema();
    return await validationSchema.validate(data, {
      abortEarly: false
    });
  }

  private readonly getValidationSchema = () => {
    return yup.object().shape({
      description: yup
        .string()
        .trim()
        .typeError('description must be a string')
        .required('description is required'),
      type: yup
        .string()
        .trim()
        .typeError('type must be a string')
        .required('type is required')
        .oneOf(
          Array.from(Object.values(DayOffSchoolType)),
          `type must be one of: ${Object.values(DayOffSchoolType).join(', ')}`
        ),
      dateBegin: yup
        .date()
        .typeError('dateBegin must be a date')
        .required('dateBegin is required'),
      dateEnd: yup.date().typeError('dateEnd must be a date')
    });
  };
}
