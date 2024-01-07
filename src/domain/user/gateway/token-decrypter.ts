import { TokenGeneratorPayload } from './access-token-generator';

export interface TokenDecrypter {
  decrypt(token: string): TokenGeneratorPayload;
}
