export interface DeleteDayOffSchoolRepository {
  delete: (dayOffSchoolId: string) => Promise<void>;
}
