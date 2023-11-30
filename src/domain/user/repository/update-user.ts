import { User } from '../entity/user';

export interface UpdateUserRepository {
  updateUser(user: User): Promise<void>;
}
