import {
  SemesterOfYear,
  SemesterType
} from '@/domain/semester/entity/semester';

export type ListSemestersUseCaseInputDTO = {
  pageNumber?: number;
  pageSize?: number;
};

export type ListSemestersUseCaseOutputDTO = {
  semesters: {
    id: string;
    year: number;
    semester: SemesterOfYear;
    startFirstStage: Date;
    endFirstStage: Date;
    startSecondStage: Date;
    endSecondStage: Date;
    type: SemesterType;
    createdAt: Date;
    updatedAt: Date;
  }[];
  quantity: number;
  pageNumber: number;
  pageSize?: number;
};
