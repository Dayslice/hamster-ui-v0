/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { StepService } from './step.service';
import { StepTool, StepToolEntityService } from 'src/entities/step_tool.entity';
import { StepToolReorderDto } from './dto/stept-tool-reorder.dto';
import { StepToolService } from './step-tool.service';

@Crud({
  model: {
    type: StepTool,
  },
  query: {
    join: {
      step_tool_inputs: {},
      tool: {},
    },
    sort: [
      {
        field: 'order',
        order: 'ASC',
      },
    ],
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'createOneBase'],
  },
})
@Controller('step-tool')
export class StepToolController {
  constructor(public service: StepToolEntityService, private logic: StepToolService) {}

  @Post('update-order')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateOrder(@Body() updateOrders: StepToolReorderDto[]) {
    await this.logic.reorder(updateOrders);
  }

  @Post(':id/inputs')
  async updateStepToolInputs(@Param('id') stepToolId: string, @Body() inputIds: string[]) {
    const stepTool = await this.service.findOne({ where: { id: stepToolId }, relations: ['step_tool_inputs'] });
    console.log(stepTool);
    if (!stepTool) {
      throw new NotFoundException('StepTool not found');
    }

    const currentInputIds = stepTool.step_tool_inputs.map((input) => input.id);

    const inputsToRemove = currentInputIds.filter((id) => !inputIds.includes(id));
    const inputsToAdd = inputIds.filter((id) => !currentInputIds.includes(id));

    // Remove associations
    for (const id of inputsToRemove) {
      const index = stepTool.step_tool_inputs.findIndex((input) => input.id === id);
      if (index !== -1) {
        stepTool.step_tool_inputs.splice(index, 1);
      }
    }

    // Add new associations
    for (const id of inputsToAdd) {
      const input = await this.service.findOne({ where: { id: id } }); // Assuming you have this method in your StepService
      if (input) {
        stepTool.step_tool_inputs.push(input);
      }
    }

    await this.service.save(stepTool);
    return this.service.findOne({ where: { id: stepTool.id }, relations: ['step_tool_inputs', 'tool'] });
  }
}
