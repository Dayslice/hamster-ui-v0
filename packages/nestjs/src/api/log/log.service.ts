/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { LogEntityService } from 'src/entities/log.entity';

@Injectable()
export class LogService {
  constructor(protected entity: LogEntityService) {}
}
