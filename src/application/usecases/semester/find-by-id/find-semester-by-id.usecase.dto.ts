import {
  SemesterOfYear,
  SemesterType
} from '@/domain/semester/entity/semester';

export type FindSemesterByIdInputDTO = {
  id: string;
};

export type FindSemesterByIdOutputDTO = {
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
};
