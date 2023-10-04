/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ToolEntityService } from 'src/entities/tool.entity';

@Injectable()
export class ToolService {
  constructor(protected entity: ToolEntityService) {}
}
