import { ListClassesUseCase } from '@/application/usecases/class/list/list-class.usecase';
import { ClassRepository } from '@/infrastructure/class/repository/class.repository';

export const makeListClassesUsecase = (): ListClassesUseCase => {
  const classRepository = new ClassRepository();
  return new ListClassesUseCase(classRepository);
};
