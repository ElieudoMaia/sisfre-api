export type UpdateClassUseCaseInputDTO = {
  id: string;
  shift: string;
  coursePeriod: number;
  semesterId: string;
  courseId: string;
};

export type UpdateClassUseCaseOutputDTO = {
  id: string;
  shift: string;
  coursePeriod: number;
  semesterId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
};
