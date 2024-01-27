import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { DayOffSchool } from '../entity/day-off-school';
import { DayOffSchoolYupValidator } from '../validation/day-off-school.validator.yup';

export class DayOffSchoolValidatorFactory {
  static create(): ValidatorInterface<DayOffSchool> {
    return new DayOffSchoolYupValidator();
  }
}
