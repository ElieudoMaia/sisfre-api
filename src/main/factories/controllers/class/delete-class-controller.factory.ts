import { DeleteClassRequestValidator } from '@/presentation/api/controllers/class/delete/delete-class-request-validator';
import { DeleteClassController } from '@/presentation/api/controllers/class/delete/delete-class.controller';
import { makeDeleteClassUseCase } from '../../usecases/class/delete-class-usecase.factory';

export const makeDeleteClassController = (): DeleteClassController => {
  const deleteClassUseCase = makeDeleteClassUseCase();
  return new DeleteClassController(
    new DeleteClassRequestValidator(),
    deleteClassUseCase
  );
};
