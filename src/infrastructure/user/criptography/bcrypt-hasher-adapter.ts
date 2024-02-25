import { HashComparer } from '@/domain/user/gateway/hash-comparer';
import { Hasher } from '@/domain/user/gateway/hasher';
const bcrypt = await import('bcrypt');

export class BcryptHasherAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
