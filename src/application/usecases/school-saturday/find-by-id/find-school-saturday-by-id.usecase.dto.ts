export type FindSchoolSaturdayByIdInputDTO = {
  id: string;
};

export type FindSchoolSaturdayByIdOutputDTO = {
  id: string;
  dayOfWeek: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
