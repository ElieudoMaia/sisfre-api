import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { SchoolSatuday } from '../entity/school-saturday';
import { SchoolSaturdayYupValidator } from '../validation/school-saturday.validator.yup';

export class SchoolSatudayValidatorFactory {
  static create(): ValidatorInterface<SchoolSatuday> {
    return new SchoolSaturdayYupValidator();
  }
}
