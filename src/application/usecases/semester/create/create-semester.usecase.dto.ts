import {
  SemesterOfYear,
  SemesterType
} from '@/domain/semester/entity/semester';

export type CreateSemesterUseCaseInputDTO = {
  year: number;
  semester: SemesterOfYear;
  startFirstStage: Date;
  endFirstStage: Date;
  startSecondStage: Date;
  endSecondStage: Date;
  type: SemesterType;
};

export type CreateSemesterUseCaseOutputDTO = {
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
