import { CreateClassUseCase } from '@/application/usecases/class/create/create-class.usecase';
import { ClassRepository } from '@/infrastructure/class/repository/class.repository';
import { CourseRepository } from '@/infrastructure/course/repository/course.repository';
import { SemesterRepository } from '@/infrastructure/semester/repository/semester.repository';

export const makeCreateClassUseCase = (): CreateClassUseCase => {
  return new CreateClassUseCase(
    new SemesterRepository(),
    new CourseRepository(),
    new ClassRepository()
  );
};
