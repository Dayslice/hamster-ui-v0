/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { StepToolEntityService } from 'src/entities/step_tool.entity';
import { StepToolReorderDto } from './dto/stept-tool-reorder.dto';

@Injectable()
export class StepToolService {
  constructor(protected entity: StepToolEntityService) {}

  async reorder(updateOrders: StepToolReorderDto[]): Promise<void> {
    const promises = updateOrders.map((update) => {
      return this.entity.save(update);
    });
    await Promise.all(promises);
  }
}
