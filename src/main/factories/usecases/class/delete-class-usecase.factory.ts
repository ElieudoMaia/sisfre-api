import { DeleteClassUseCase } from '@/application/usecases/class/delete/delete-class.usecase';
import { ClassRepository } from '@/infrastructure/class/repository/class.repository';

export const makeDeleteClassUseCase = (): DeleteClassUseCase => {
  const classRepository = new ClassRepository();
  return new DeleteClassUseCase(classRepository, classRepository);
};
