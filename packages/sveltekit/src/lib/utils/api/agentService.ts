import type { Agent } from '$entities/agent.entity';
import { get, post, patch } from './base';
async function getOne(id: string): Promise<Agent> {
  return get<Agent>(`agent/${id}`);
}

async function getMany(): Promise<Agent[]> {
  return get<Agent[]>(`agent`);
}

async function create(data: Partial<Agent>): Promise<Agent> {
  return post<Agent>('agent', data);
}

async function update(id: string, data: Partial<Agent>): Promise<Agent> {
  return patch<Agent>(`agent/${id}`, data);
}

export default {
  getOne,
  getMany,
  create,
  update,
};
