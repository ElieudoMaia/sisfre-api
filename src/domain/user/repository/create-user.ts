import { User } from '../entity/user';

export interface CreateUserRepository {
  create(input: User): Promise<void>;
}
