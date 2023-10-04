/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { RunEntityService } from 'src/entities/run.entity';

@Injectable()
export class RunService {
  constructor(protected entity: RunEntityService) {}
}
