import {
  AccessTokenGenerator,
  TokenGeneratorPayload
} from '@/domain/user/gateway/access-token-generator';
import { TokenDecrypter } from '@/domain/user/gateway/token-decrypter';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements AccessTokenGenerator, TokenDecrypter {
  constructor(private readonly secret: string) {}

  async generate(payload: TokenGeneratorPayload): Promise<string> {
    const token = jwt.sign(payload, this.secret, { expiresIn: '1d' });
    return token;
  }

  decrypt(token: string): TokenGeneratorPayload {
    const payload = jwt.verify(token, this.secret) as TokenGeneratorPayload;
    return payload;
  }
}
