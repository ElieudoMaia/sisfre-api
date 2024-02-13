import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { Class, ClassShift } from '@/domain/class/entity/class';
import { FindClassByIdRepository } from '@/domain/class/repository/find-class-by-id';
import { UpdateClassRepository } from '@/domain/class/repository/update-class';
import { FindCourseByIdRepository } from '@/domain/course/repository/find-course-by-id';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import {
  UpdateClassUseCaseInputDTO,
  UpdateClassUseCaseOutputDTO
} from './update-class.usecase.dto';

export class UpdateClassUseCase {
  constructor(
    private readonly findClassByIdRepository: FindClassByIdRepository,
    private readonly findSemesterByIdRepository: FindSemesterByIdRepository,
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly updateClassRepository: UpdateClassRepository
  ) {}

  async execute(
    input: UpdateClassUseCaseInputDTO
  ): Promise<UpdateClassUseCaseOutputDTO> {
    const savedClass = await this.findClassByIdRepository.findById(input.id);
    if (!savedClass) {
      throw new NotFoundError('Class not found');
    }

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
      id: input.id,
      shift: input.shift as ClassShift,
      coursePeriod: input.coursePeriod,
      semester,
      course
    });

    await this.updateClassRepository.update(schoolClass);

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
