export type FindSchoolSaturdayByIdInputDTO = {
  id: string;
};

export type FindSchoolSaturdayByIdOutputDTO = {
  id: string;
  referringTo: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
