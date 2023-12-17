import * as yup from 'yup';

import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { SchoolSaturday } from '../entity/school-saturday';

const validReferencedDayOfWeek = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY'
];

export class SchoolSaturdayYupValidator
  implements ValidatorInterface<SchoolSaturday>
{
  validate(schoolSaturday: SchoolSaturday): void {
    try {
      const schema = yup.object().shape({
        id: yup
          .string()
          .typeError('id must be a string')
          .trim()
          .uuid('id must be a valid uuid')
          .notRequired(),
        referringTo: yup
          .string()
          .required()
          .oneOf(
            validReferencedDayOfWeek,
            `referringTo must be one of: ${validReferencedDayOfWeek.join(', ')}`
          ),
        date: yup
          .date()
          .typeError('date must be a date')
          .test(
            'is-saturday',
            'date must be a saturday',
            (date) => date?.getDay() === 6
          )
          .min(new Date(), 'date must not be today or a past date')
          .required('date is required')
      });
      schema.validateSync(schoolSaturday, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((err) => {
        schoolSaturday.notification.addError({
          message: err,
          context: 'SchoolSaturday'
        });
      });
    }
  }
}
