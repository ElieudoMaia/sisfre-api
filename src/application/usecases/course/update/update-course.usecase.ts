import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { CheckCourseExistsByAcronymRepository } from '@/domain/course/repository/check-course-exists-by-acronym';
import { CheckCourseExistsByNameRepository } from '@/domain/course/repository/check-course-exists-by-name';
import { FindCourseByIdRepository } from '@/domain/course/repository/find-course-by-id';
import { UpdateCourseRepository } from '@/domain/course/repository/update-course';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
import {
  UpdateCourseUseCaseInputDTO,
  UpdateCourseUseCaseOutputDTO
} from './update-course.usecase.dto';

export class UpdateCourseUsecase {
  constructor(
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly checkCourseExistsByNameRepository: CheckCourseExistsByNameRepository,
    private readonly checkCourseExistsByAcronymRepository: CheckCourseExistsByAcronymRepository,
    private readonly updateCourseRepository: UpdateCourseRepository
  ) {}

  async execute(
    input: UpdateCourseUseCaseInputDTO
  ): Promise<UpdateCourseUseCaseOutputDTO> {
    const course = await this.findCourseByIdRepository.findCourseById(input.id);
    if (!course) throw new NotFoundError('Course not found');

    const user = await this.findUserByIdRepository.findUserById(
      input.coordinatorId
    );
    if (!user) {
      throw new InvalidResourceError('Coordinator does not exist');
    }
    if (!user.isActive) {
      throw new InvalidResourceError('Coordinator is not a active user');
    }
    if (user.isCoordinator && input.coordinatorId !== course.coordinatorId) {
      throw new InvalidResourceError(
        'Coordinator is already assigned to a course'
      );
    }

    const foundCourseByName =
      await this.checkCourseExistsByNameRepository.checkCourseExistsByName(
        input.name
      );
    if (foundCourseByName && foundCourseByName.id !== input.id) {
      throw new InvalidResourceError('Already exists a course with this name');
    }

    const foundCourseByAcronym =
      await this.checkCourseExistsByAcronymRepository.checkCourseExistsByAcronym(
        input.acronym
      );
    if (foundCourseByAcronym && foundCourseByAcronym.id !== input.id) {
      throw new InvalidResourceError(
        'Already exists a course with this acronym'
      );
    }

    course.name = input.name;
    course.type = input.type;
    course.acronym = input.acronym;
    course.coordinatorId = input.coordinatorId;
    course.duration = input.duration;
    course.coordinator = user;

    await this.updateCourseRepository.updateCourse(course);
  }
}
