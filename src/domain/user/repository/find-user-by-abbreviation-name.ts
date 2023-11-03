import { User } from '../entity/user';

export type FindUserByNameAbbreviationRepositoryInput = {
  abbreviationName: string;
};

export type FindUserByNameAbbreviationRepositoryOutput = User | null;

export interface FindUserByNameAbbreviationRepository {
  findByAbbreviationName(
    input: FindUserByNameAbbreviationRepositoryInput
  ): Promise<FindUserByNameAbbreviationRepositoryOutput>;
}
