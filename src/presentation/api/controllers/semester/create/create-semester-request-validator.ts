/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

export class CreateSemesterRequestValidator {
  async validate(data: any) {
    const validationSchema = this.getValidationSchema(data);
    return validationSchema.validate(data, {
      abortEarly: false
    });
  }

  private readonly getValidationSchema = (data: any) => {
    return yup.object().shape({
      year: yup
        .number()
        .typeError('year must be a number')
        .integer('year must be an integer')
        .min(new Date().getFullYear(), 'year must not be a past year')
        .required('year is required'),
      semester: yup
        .number()
        .typeError('semester must be a number')
        .integer('semester must be an integer')
        .min(1, 'semester must be 1 or 2')
        .max(2, 'semester must be 1 or 2')
        .required('semester is required'),
      startFirstStage: yup
        .date()
        .typeError('startFirstStage must be a date')
        .test(
          'is-same-year',
          'startFirstStage must be in the same year as year',
          (date) => date?.getFullYear() === data.year
        )
        .required('startFirstStage is required'),
      endFirstStage: yup
        .date()
        .typeError('endFirstStage must be a date')
        .min(
          yup.ref('startFirstStage'),
          'endFirstStage must be after startFirstStage'
        )
        .test(
          'is-same-year',
          'endFirstStage must be in the same year as year',
          (date) => date?.getFullYear() === data.year
        )
        .required('endFirstStage is required'),
      startSecondStage: yup
        .date()
        .typeError('startSecondStage must be a date')
        .min(
          yup.ref('endFirstStage'),
          'startSecondStage must be after endFirstStage'
        )
        .test(
          'is-same-year',
          'startSecondStage must be in the same year as year',
          (date) => date?.getFullYear() === data.year
        )
        .required('startSecondStage is required'),
      endSecondStage: yup
        .date()
        .typeError('endSecondStage must be a date')
        .min(
          yup.ref('startSecondStage'),
          'endSecondStage must be after startSecondStage'
        )
        .test(
          'is-same-year',
          'endSecondStage must be in the same year as year',
          (date) => date?.getFullYear() === data.year
        )
        .required('endSecondStage is required'),
      type: yup
        .string()
        .typeError('type must be a string')
        .trim()
        .oneOf(
          ['REGULAR', 'CONVENTIONAL'],
          'type must be REGULAR or CONVENTIONAL'
        )
        .required('type is required')
    });
  };
}
