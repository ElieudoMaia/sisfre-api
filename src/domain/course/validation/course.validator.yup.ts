import * as yup from 'yup';

import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { Course } from '../entity/course';

export class CourseYupValidator implements ValidatorInterface<Course> {
  validate(course: Course): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().typeError('id must be a string').notRequired(),
        name: yup
          .string()
          .typeError('name must be a string')
          .required('name is required')
          .max(255, 'name must be less than 255 characters')
          .trim(),
        type: yup
          .string()
          .trim()
          .typeError('type must be a string')
          .oneOf(
            ['GRADUATION', 'INTEGRATED', 'TECHNICAL'],
            'type must be one of GRADUATION, INTEGRATED or TECHNICAL'
          )
          .required(),
        coordinatorId: yup
          .string()
          .typeError('coordinatorId must be a string')
          .required('coordinatorId is required')
          .trim(),
        acronym: yup
          .string()
          .trim()
          .typeError('acronym must be a string')
          .max(10, 'acronym must be less than 10 characters')
          .matches(
            /^[A-Z]{3,10}$/,
            'acronym must be in the format [A-Z] and have between 3 and 10 characters'
          )
          .required('acronym is required'),
        duration: yup
          .number()
          .typeError('duration must be a number')
          .required('duration is required')
          .min(1, 'duration must be greater than 0')
      });

      if (
        course.coordinator &&
        course.coordinator.id !== course.coordinatorId
      ) {
        course.notification.addError({
          context: 'Course',
          message: 'coordinatorId must be the same as coordinator.id'
        });
      }

      schema.validateSync(course, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((err) => {
        course.notification.addError({
          message: err,
          context: 'Course'
        });
      });
    }
  }
}
