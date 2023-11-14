import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { Course } from '../entity/course';
import { CourseYupValidator } from '../validation/course.validator.yup';

export class CourseValidatorFactory {
  static create(): ValidatorInterface<Course> {
    return new CourseYupValidator();
  }
}
