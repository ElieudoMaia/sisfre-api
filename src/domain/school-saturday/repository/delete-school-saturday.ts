export interface DeleteSchoolSaturdayRepository {
  delete: (schoolSaturdayId: string) => Promise<void>;
}
