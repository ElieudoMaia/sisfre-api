import { NotAllowedError } from '@/domain/@shared/error/not-allowed.error';
import { AccessTokenGenerator } from '@/domain/user/gateway/access-token-generator';
import { HashComparer } from '@/domain/user/gateway/hash-comparer';
import { FindUserByEmailRepository } from '@/domain/user/repository/find-user-by-email';
import {
  LoginUseCaseInputDTO,
  LoginUseCaseOutputDTO
} from './login.usecase.dto';

export class LoginUseCase {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly accessTokenGenerator: AccessTokenGenerator
  ) {}
  async execute(input: LoginUseCaseInputDTO): Promise<LoginUseCaseOutputDTO> {
    const user = await this.findUserByEmailRepository.findUserByEmail({
      email: input.email
    });

    if (!user) throw new NotAllowedError('User not found');
    if (!user.isActive) throw new NotAllowedError('User is not active');

    const isPasswordCorrect = await this.hashComparer.compare(
      input.password,
      user.password
    );
    if (!isPasswordCorrect) throw new NotAllowedError('Password incorrect');

    const accessToken = await this.accessTokenGenerator.generate({
      id: user.id,
      name: user.name,
      email: user.email
    });

    return { accessToken };
  }
}
