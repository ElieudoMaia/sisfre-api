export type listCoursesUseCaseInputDTO = {
  pageNumber?: number;
  pageSize?: number;
};

export type listCoursesUseCaseOutputDTO = {
  courses: {
    id?: string;
    name: string;
    type: string;
    acronym: string;
    duration: number;
    coordinator?: {
      id: string;
      name: string;
      email: string;
    };
  }[];
  quantity: number;
  pageNumber: number;
  pageSize?: number;
};
