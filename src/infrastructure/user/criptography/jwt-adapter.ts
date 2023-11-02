import {
  AccessTokenGenerator,
  TokenGeneratorPayload
} from '@/domain/user/gateway/access-token-generator';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements AccessTokenGenerator {
  constructor(private readonly secret: string) {}

  async generate(payload: TokenGeneratorPayload): Promise<string> {
    const token = jwt.sign(payload, this.secret);
    return token;
  }
}
