/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { AgentEntityService } from 'src/entities/agent.entity';

@Injectable()
export class AgentService {
  constructor(protected entity: AgentEntityService) {}
}
