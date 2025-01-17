import type { Step } from '$entities/step.entity';
import { get, post, patch } from './base';
async function getOne(id: string): Promise<Step> {
  return get<Step>(`step/${id}?join=step_tools&join=primary_agent&join=other_agents`);
}

async function getMany(): Promise<Step[]> {
  return get<Step[]>(`step?join=step_tools&join=primary_agent&join=other_agents`);
}

async function getManyForWorkflow(workflow_id: string): Promise<Step[]> {
  return get<Step[]>(
    `step?filter=workflow_id||$eq||${workflow_id}&join=step_tools&join=primary_agent&join=other_agents&join=step_tools.attachments`,
  );
}
async function getManyForUI(workflow_id: string): Promise<Step[]> {
  return get<Step[]>(
    `step?sort=order,ASC&sort=step_tools.order,ASC&filter=workflow_id||$eq||${workflow_id}&join=step_tools&join=primary_agent&join=other_agents&join=step_tools.attachments&join=step_tools.tool&join=step_tools.step_tool_inputs`,
  );
}
async function create(data: Partial<Step>): Promise<Step> {
  return post<Step>('step', data);
}

async function update(id: string, data: Partial<Step>): Promise<Step> {
  return patch<Step>(`step/${id}`, data);
}

export default {
  getOne,
  getMany,
  getManyForWorkflow,
  getManyForUI,
  create,
  update,
};
