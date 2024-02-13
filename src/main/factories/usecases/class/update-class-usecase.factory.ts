import { UpdateClassUseCase } from '@/application/usecases/class/update/update-class.usecase';
import { ClassRepository } from '@/infrastructure/class/repository/class.repository';
import { CourseRepository } from '@/infrastructure/course/repository/course.repository';
import { SemesterRepository } from '@/infrastructure/semester/repository/semester.repository';

export const makeUpdateClassUseCase = (): UpdateClassUseCase => {
  const classRepository = new ClassRepository();
  const courseRepository = new CourseRepository();
  const semesterRepository = new SemesterRepository();
  return new UpdateClassUseCase(
    classRepository,
    semesterRepository,
    courseRepository,
    classRepository
  );
};
