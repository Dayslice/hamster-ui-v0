import type { Run } from '$entities/run.entity';
import type { Workflow } from '$entities/workflow.entity';
import { get, post, patch } from './base';
async function getOne(id: string): Promise<Workflow> {
  return get<Workflow>(`workflow/${id}?join=step&join=agent`);
}

async function getMany(): Promise<Workflow[]> {
  return get<Workflow[]>(`workflow?join=step&join=agent`);
}

async function create(data: Partial<Workflow>): Promise<Workflow> {
  return post<Workflow>('workflow', data);
}

async function update(id: string, data: Partial<Workflow>): Promise<Workflow> {
  return patch<Workflow>(`workflow/${id}`, data);
}

async function run(workflow_id: string, company_id: string, initial_input = '') {
  const engine_url = import.meta.env.DEV ? 'http://localhost:8000' : 'https://hiveai-engine-4ae52c8098bb.herokuapp.com/';
  fetch(`${engine_url}/workflow/${workflow_id}/start/company/${company_id}`, {
    method: 'POST',
    body: JSON.stringify({
      initial_input: initial_input,
    }),
    headers: {
      'Content-Type': 'application/json',
      // add other headers as needed
    },
  });
}

export default {
  getOne,
  getMany,
  create,
  update,
  run,
};
