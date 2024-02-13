import { FindClassByIdUseCase } from '@/application/usecases/class/find-by-id/find-class-by-id.usecase';
import { ClassRepository } from '@/infrastructure/class/repository/class.repository';

export const makeFindClassByIdUseCase = (): FindClassByIdUseCase => {
  const classRepository = new ClassRepository();
  return new FindClassByIdUseCase(classRepository);
};
