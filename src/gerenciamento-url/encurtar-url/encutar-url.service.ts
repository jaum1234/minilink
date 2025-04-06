import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EncutarUrlService {
  encutar(origem: string): string {
    const hash = crypto
      .createHash('md5')
      .update(origem + uuidv4())
      .digest('base64');
    const codigo = hash.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);

    return codigo;
  }
}
