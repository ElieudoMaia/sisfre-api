import { ClassShift } from '@/domain/class/entity/class';

export type FindClassByIdInputDTO = {
  id: string;
};

export type FindClassByIdOutputDTO = {
  id: string;
  shift: ClassShift;
  coursePeriod: number;
  course: {
    id: string;
    name: string;
    duration: number;
  };
  semester: {
    id: string;
    year: number;
    semester: number;
  };
  createdAt: Date;
  updatedAt: Date;
};
