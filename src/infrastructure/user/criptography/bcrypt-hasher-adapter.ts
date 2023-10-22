import { HashComparer } from '@/domain/user/gateway/hash-comparer';
import bcrypt from 'bcrypt';

export class BcryptHasherAdapter implements HashComparer {
  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
