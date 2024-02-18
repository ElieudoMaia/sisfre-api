import * as yup from 'yup';

import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { Semester, SemesterOfYear } from '../entity/semester';

export class SemesterYupValidator implements ValidatorInterface<Semester> {
  validate(semester: Semester): void {
    try {
      const schema = yup.object().shape({
        id: yup
          .string()
          .typeError('id must be a string')
          .trim()
          .uuid('id must be a valid uuid')
          .notRequired(),
        year: yup
          .number()
          .typeError('year must be a number')
          .integer('year must be an integer')
          .min(new Date().getFullYear(), 'year must not be a past year')
          .required('year is required'),
        semester: yup
          .string()
          .typeError('semester must be a string')
          .trim()
          .oneOf(
            [SemesterOfYear.FIRST, SemesterOfYear.SECOND],
            'semester must be FIRST or SECOND'
          )
          .required('semester is required'),
        startFirstStage: yup
          .date()
          .typeError('startFirstStage must be a date')
          .test(
            'is-same-year',
            'startFirstStage must be in the same year as year',
            (date) => date?.getFullYear() === semester.year
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
            (date) => date?.getFullYear() === semester.year
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
            (date) => date?.getFullYear() === semester.year
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
            (date) => date?.getFullYear() === semester.year
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
          .required('type is required'),
        updatedAt: yup
          .date()
          .typeError('updatedAt must be a date')
          .min(yup.ref('createdAt'), 'updatedAt must be after createdAt')
          .required('updatedAt is required')
      });

      schema.validateSync(semester, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((err) => {
        semester.notification.addError({
          message: err,
          context: 'Semester'
        });
      });
    }
  }
}
