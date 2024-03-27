import * as yup from 'yup';

import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { Course } from '@/domain/course/entity/course';
import { Semester } from '@/domain/semester/entity/semester';
import { Class } from '../entity/class';

export class ClassYupValidator implements ValidatorInterface<Class> {
  validate(data: Class): void {
    try {
      const schema = yup.object().shape({
        id: yup
          .string()
          .typeError('id must be a string')
          .trim()
          .uuid('id must be a valid uuid')
          .notRequired(),
        semester: yup
          .object()
          .typeError('semester must be a object')
          .test(
            'semester',
            'semester must be instance of Semester',
            (value: Semester) => {
              return value instanceof Semester;
            }
          )
          .required('semester is required'),
        shift: yup
          .string()
          .typeError('shift must be a string')
          .oneOf(
            ['MORNING', 'AFTERNOON', 'NIGHT'],
            'shift must be one of MORNING, AFTERNOON or NIGHT'
          )
          .required('shift is required'),
        course: yup
          .object()
          .typeError('course must be a object')
          .test('course', 'course must be instance of Course', (value) => {
            return value instanceof Course;
          })
          .required('course is required'),
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
      schema.validateSync(data, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((err) => {
        data.notification.addError({
          message: err,
          context: 'Class'
        });
      });
    }
  }
}
