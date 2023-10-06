import type { Tool } from '$entities/tool.entity';
import { get, post, patch } from './base';
async function getOne(id: string): Promise<Tool> {
  return get<Tool>(`tool/${id}`);
}

async function getMany(): Promise<Tool[]> {
  return get<Tool[]>(`tool?join=step&join=agent`);
}

async function create(data: Partial<Tool>): Promise<Tool> {
  return post<Tool>('tool', data);
}

async function update(id: string, data: Partial<Tool>): Promise<Tool> {
  return patch<Tool>(`tool/${id}`, data);
}

export default {
  getOne,
  getMany,
  create,
  update,
};
