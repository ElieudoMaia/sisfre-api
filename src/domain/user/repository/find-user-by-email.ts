import { User } from '../entity/user';

export type Input = {
  email: string;
};

export type Output = User | null;

export interface FindUserByEmailRepository {
  findUserByEmail(input: Input): Promise<Output>;
}
