import type { StepTool } from '$entities/step_tool.entity';
import { get, post, patch } from './base';
async function getOne(id: string): Promise<StepTool> {
  return get<StepTool>(`step-tool/${id}?join=step_tools&join=tool`);
}

async function getMany(): Promise<StepTool[]> {
  return get<StepTool[]>(`step-tool?join=step_tools&join=tool`);
}

async function getManyForStep(step_id: string): Promise<StepTool[]> {
  return get<StepTool[]>(`step-tool?filter=step_id||$eq||${step_id}&join=step_tools&join=tool&step_tool_inputs`);
}

async function create(data: Partial<StepTool>): Promise<StepTool> {
  return post<StepTool>('step-tool', data);
}

async function update(id: string, data: Partial<StepTool>): Promise<StepTool> {
  return patch<StepTool>(`step-tool/${id}`, data);
}

async function updateInputs(id: string, step_tool_input_ids: string[]): Promise<StepTool> {
  return post<StepTool>(`step-tool/${id}/inputs`, step_tool_input_ids);
}

async function updateOrder(stepTools: StepTool[]) {
  const updateOrderDtos = stepTools.map((tool) => ({ id: tool.id, order: tool.order }));
  await post<StepTool>(`step-tool/update-order`, updateOrderDtos);
}

export default {
  getOne,
  getMany,
  getManyForStep,
  create,
  update,
  updateInputs,
  updateOrder,
};
