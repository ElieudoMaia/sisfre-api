import { User } from '@/domain/user/entity/user';
import {
  FindUserByEmailRepository,
  Input,
  Output
} from '@/domain/user/repository/find-user-by-email';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class UserRepository implements FindUserByEmailRepository {
  async findUserByEmail(input: Input): Promise<Output> {
    const user = await prisma.user.findFirst({
      where: {
        email: input.email
      }
    });

    if (!user) return null;

    return new User(user.id, user.name, user.email, user.password);
  }
}
