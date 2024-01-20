export interface DeleteSemesterRepository {
  delete(id: string): Promise<void>;
}
