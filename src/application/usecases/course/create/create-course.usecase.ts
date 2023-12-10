import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { Course } from '@/domain/course/entity/course';
import { CheckCourseExistsByAcronymRepository } from '@/domain/course/repository/check-course-exists-by-acronym';
import { CheckCourseExistsByNameRepository } from '@/domain/course/repository/check-course-exists-by-name';
import { CreateCourseRepository } from '@/domain/course/repository/create-course';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
import {
  CreateCourseUseCaseInputDTO,
  CreateCourseUseCaseOutputDTO
} from './create-course.usecase.dto';

export class CreateCourseUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly checkCourseExistsByNameRepository: CheckCourseExistsByNameRepository,
    private readonly checkCourseExistsByAcronymRepository: CheckCourseExistsByAcronymRepository,
    private readonly createCourseRepository: CreateCourseRepository
  ) {}

  async execute(
    input: CreateCourseUseCaseInputDTO
  ): Promise<CreateCourseUseCaseOutputDTO> {
    const course = new Course({
      name: input.name,
      type: input.type,
      acronym: input.acronym,
      coordinatorId: input.coordinatorId,
      duration: input.duration
    });

    const user = await this.findUserByIdRepository.findUserById(
      course.coordinatorId
    );
    if (!user) {
      throw new InvalidResourceError('Coordinator does not exist');
    }
    if (!user.isActive) {
      throw new InvalidResourceError('Coordinator is not a active user');
    }
    if (user.isCoordinator) {
      throw new InvalidResourceError(
        'Coordinator is already assigned to a course'
      );
    }

    const courseNameAlreadyExists =
      await this.checkCourseExistsByNameRepository.checkCourseExistsByName(
        course.name
      );
    if (courseNameAlreadyExists) {
      throw new InvalidResourceError('Already exists a course with this name');
    }

    const courseAcronymAlreadyExists =
      await this.checkCourseExistsByAcronymRepository.checkCourseExistsByAcronym(
        course.acronym
      );
    if (courseAcronymAlreadyExists) {
      throw new InvalidResourceError(
        'Already exists a course with this acronym'
      );
    }

    await this.createCourseRepository.createCourse(course);

    return {
      id: course.id,
      name: course.name,
      type: course.type,
      coordinatorId: course.coordinatorId,
      acronym: course.acronym,
      duration: course.duration,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt
    };
  }
}
