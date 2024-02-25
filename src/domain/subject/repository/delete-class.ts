export interface DeleteClassRepository {
  delete(id: string): Promise<void>;
}
