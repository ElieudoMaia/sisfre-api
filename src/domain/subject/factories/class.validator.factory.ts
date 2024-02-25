import { ValidatorInterface } from '@/domain/@shared/validation/validator.interface';
import { Class } from '../entity/subject';
import { ClassYupValidator } from '../validation/class.validator.yup';

export class ClassValidatorFactory {
  static create(): ValidatorInterface<Class> {
    return new ClassYupValidator();
  }
}
