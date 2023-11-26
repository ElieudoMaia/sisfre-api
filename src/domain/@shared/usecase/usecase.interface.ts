export interface UseCase<P = void, R = void> {
  execute(params: P): Promise<R>;
}
