import { CourseType } from '@/domain/course/entity/course';

export type CreateCourseUseCaseInputDTO = {
  name: string;
  type: CourseType;
  coordinatorId: string;
  acronym: string;
  duration: number;
};

export type CreateCourseUseCaseOutputDTO = void;
