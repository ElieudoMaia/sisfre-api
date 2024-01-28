import * as yup from 'yup';

import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { DayOffSchool, DayOffSchoolType } from '../entity/day-off-school';

export class DayOffSchoolYupValidator
  implements ValidatorInterface<DayOffSchool>
{
  validate(dayOffSchool: DayOffSchool): void {
    try {
      const schema = yup.object().shape({
        id: yup
          .string()
          .typeError('id must be a string')
          .trim()
          .uuid('id must be a valid uuid')
          .notRequired(),
        description: yup
          .string()
          .typeError('description must be a string')
          .required('description is required')
          .min(3, 'description must be at least 3 characters')
          .max(255, 'description must be at most 255 characters'),
        type: yup
          .string()
          .typeError('type must be a string')
          .required('type is required')
          .oneOf(
            Array.from(Object.values(DayOffSchoolType)),
            `type must be one of: ${Object.values(DayOffSchoolType).join(', ')}`
          ),
        dateBegin: yup
          .date()
          .typeError('dateBegin must be a date')
          .test(
            'dateBegin',
            'dateBegin must not be a sunday when type is HOLIDAY',
            (value) =>
              dayOffSchool.type !== DayOffSchoolType.HOLIDAY ||
              value?.getDay() !== 0
          )
          .required('dateBegin is required'),
        dateEnd: yup
          .date()
          .typeError('dateEnd must be a date')
          .test(
            'dateEnd',
            `dateEnd is required when type is ${dayOffSchool.type}`,
            (value) => dayOffSchool.type === DayOffSchoolType.HOLIDAY || !!value
          )
          .min(
            yup.ref('dateBegin'),
            'dateEnd must be after than or equal to dateBegin'
          ),
        createdAt: yup
          .date()
          .typeError('createdAt must be a date')
          .required('createdAt is required'),
        updatedAt: yup
          .date()
          .typeError('updatedAt must be a date')
          .required('updatedAt is required')
          .min(
            yup.ref('createdAt'),
            'updatedAt must be after than or equal to createdAt'
          )
      });
      schema.validateSync(dayOffSchool, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((err) => {
        dayOffSchool.notification.addError({
          message: err,
          context: 'DayOffSchool'
        });
      });
    }
  }
}
