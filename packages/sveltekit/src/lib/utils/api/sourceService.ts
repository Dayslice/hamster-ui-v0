import type { Source } from '$entities/source.entity';
import { get, post, patch } from './base';
async function getOne(id: string): Promise<Source> {
  return get<Source>(`source/${id}?join=source_tools&join=primary_agent&join=other_agents`);
}

async function getMany(): Promise<Source[]> {
  return get<Source[]>(`source?join=source_tools&join=primary_agent&join=other_agents`);
}

async function getManyForCompany(company_id: string): Promise<Source[]> {
  return get<Source[]>(`source?filter=company_id||$eq||${company_id}`);
}

async function create(data: Partial<Source>): Promise<Source> {
  return post<Source>('source', data);
}

async function update(id: string, data: Partial<Source>): Promise<Source> {
  return patch<Source>(`source/${id}`, data);
}

export default {
  getOne,
  getMany,
  getManyForCompany,
  create,
  update,
};
