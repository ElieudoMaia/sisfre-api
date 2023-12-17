import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { SchoolSaturday } from '../entity/school-saturday';
import { SchoolSaturdayYupValidator } from '../validation/school-saturday.validator.yup';

export class SchoolSaturdayValidatorFactory {
  static create(): ValidatorInterface<SchoolSaturday> {
    return new SchoolSaturdayYupValidator();
  }
}
