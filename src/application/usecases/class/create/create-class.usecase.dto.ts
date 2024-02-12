export type CreateClassUseCaseInputDTO = {
  shift: string;
  coursePeriod: number;
  semesterId: string;
  courseId: string;
};

export type CreateClassUseCaseOutputDTO = {
  id: string;
  shift: string;
  coursePeriod: number;
  semesterId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
};
