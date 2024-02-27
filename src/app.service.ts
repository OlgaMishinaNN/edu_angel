import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  readJSON(filePath: string): any {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
}
