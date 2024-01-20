import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { Semester } from '../entity/semester';
import { SemesterYupValidator } from '../validation/semester.validator.yup';

export class SemesterValidatorFactory {
  static create(): ValidatorInterface<Semester> {
    return new SemesterYupValidator();
  }
}
