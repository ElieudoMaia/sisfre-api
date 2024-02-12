import { ClassShift } from '@/domain/class/entity/class';

export type ListClassesUseCaseInputDTO = {
  pageNumber?: number;
  pageSize?: number;
};

export type ListClassesUseCaseOutputDTO = {
  classes: {
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
  }[];
  quantity: number;
  pageNumber: number;
  pageSize?: number;
};
