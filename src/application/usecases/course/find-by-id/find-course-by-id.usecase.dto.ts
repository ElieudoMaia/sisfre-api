import { CourseType } from '@/domain/course/entity/course';

export type FindCourseByIdInputDTO = {
  id: string;
};

export type FindCourseByIdOutputDTO = {
  id: string;
  name: string;
  type: CourseType;
  acronym: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  coordinator: {
    id: string;
    name: string;
  };
};
