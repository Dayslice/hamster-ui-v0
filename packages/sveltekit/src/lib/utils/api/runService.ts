import type { Run } from '$entities/run.entity';
import { get, post, patch } from './base';
async function getOne(id: string, queryParams: Record<string, string> | string[][] = {}): Promise<Run> {
  const params: URLSearchParams = new URLSearchParams(queryParams);
  return get<Run>(`run/${id}?${params.toString()}`);
}

async function getMany(queryParams: Record<string, string> | string[][] = {}): Promise<Run[]> {
  const params: URLSearchParams = new URLSearchParams(queryParams);
  return get<Run[]>(`run?${params.toString()}`);
}

async function getManyForCompany(company_id: string): Promise<Run[]> {
  const params = {
    filter: `company_id||$eq||${company_id}`,
    join: 'workflow',
  };
  return getMany(params);
}

async function create(data: Partial<Run>): Promise<Run> {
  return post<Run>('run', data);
}

async function update(id: string, data: Partial<Run>): Promise<Run> {
  return patch<Run>(`run/${id}`, data);
}

export default {
  getOne,
  getMany,
  create,
  update,
  getManyForCompany,
};
