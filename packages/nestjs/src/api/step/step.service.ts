/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { StepEntityService } from 'src/entities/step.entity';
import { StepTool } from 'src/entities/step_tool.entity';

@Injectable()
export class StepService {
  constructor(protected entity: StepEntityService) {}

  async findStepToolInputs(stepId: string, stepToolId: string): Promise<StepTool[]> {
    const step = await this.entity.findOne({ where: { id: stepId }, relations: ['step_tools', 'step_tools.step_tool_inputs'] });
    const stepTool = step.step_tools.find((st) => st.id === stepToolId);
    return stepTool ? stepTool.step_tool_inputs : [];
  }
}
