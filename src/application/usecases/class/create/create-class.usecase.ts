import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { Class, ClassShift } from '@/domain/class/entity/class';
import { CreateClassRepository } from '@/domain/class/repository/create-class';
import { FindCourseByIdRepository } from '@/domain/course/repository/find-course-by-id';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import {
  CreateClassUseCaseInputDTO,
  CreateClassUseCaseOutputDTO
} from './create-class.usecase.dto';

export class CreateClassUseCase {
  constructor(
    private readonly findSemesterByIdRepository: FindSemesterByIdRepository,
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly createClassRepository: CreateClassRepository
  ) {}

  async execute(
    input: CreateClassUseCaseInputDTO
  ): Promise<CreateClassUseCaseOutputDTO> {
    const [semester, course] = await Promise.all([
      this.findSemesterByIdRepository.findById(input.semesterId),
      this.findCourseByIdRepository.findCourseById(input.courseId)
    ]);

    if (!semester) {
      throw new InvalidResourceError('Semester does not exist');
    }

    if (!course) {
      throw new InvalidResourceError('Course does not exist');
    }

    const isAValidCoursePeriod = input.coursePeriod <= course.duration;
    if (!isAValidCoursePeriod) {
      throw new InvalidResourceError(
        `Invalid course period: it must be less than or equal to ${course.duration}`
      );
    }

    const schoolClass = new Class({
      shift: input.shift as ClassShift,
      coursePeriod: input.coursePeriod,
      semester,
      course
    });

    await this.createClassRepository.create(schoolClass);

    return {
      id: schoolClass.id,
      shift: schoolClass.shift,
      courseId: course.id,
      semesterId: semester.id,
      coursePeriod: schoolClass.coursePeriod,
      createdAt: schoolClass.createdAt,
      updatedAt: schoolClass.updatedAt
    };
  }
}
