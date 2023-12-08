import { CourseType } from '@/domain/course/entity/course';

export type UpdateCourseUseCaseInputDTO = {
  id: string;
  name: string;
  type: CourseType;
  coordinatorId: string;
  acronym: string;
  duration: number;
};

export type UpdateCourseUseCaseOutputDTO = void;
