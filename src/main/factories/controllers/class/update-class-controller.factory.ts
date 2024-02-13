import { UpdateClassRequestValidator } from '@/presentation/api/controllers/class/update/update-class-request-validator';
import { UpdateClassController } from '@/presentation/api/controllers/class/update/update-class.controller';
import { makeUpdateClassUseCase } from '../../usecases/class/update-class-usecase.factory';

export const makeUpdateClassController = (): UpdateClassController => {
  const updateClassRequestValidator = new UpdateClassRequestValidator();
  const updateClassUseCase = makeUpdateClassUseCase();
  return new UpdateClassController(
    updateClassRequestValidator,
    updateClassUseCase
  );
};
