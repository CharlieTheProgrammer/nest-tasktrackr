import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
const password = 'random_password';

@Injectable()
export class HashService {
  static async make(str: string) {
    return await bcrypt.hash(str, saltOrRounds);
  }

  static async compare(stringToCompare: string, hash: string) {
    return await bcrypt.compare(stringToCompare, hash);
  }
}
