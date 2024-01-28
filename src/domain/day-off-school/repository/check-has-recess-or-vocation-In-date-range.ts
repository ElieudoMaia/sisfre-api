export interface CheckHasRecessOrVocationInDateRangeRepository {
  checkByDateRange(dateBegin: Date, dateEnd: Date): Promise<boolean>;
}
