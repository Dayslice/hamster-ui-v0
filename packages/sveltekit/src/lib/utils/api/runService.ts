import type { Run } from '$entities/run.entity';
import { get, post, patch, hardDelete } from './base';
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

async function deleteOne(id: string): Promise<boolean> {
  return hardDelete<Run>(`run/${id}`);
}

async function cancelOne(run_id: string): Promise<Run> {
  const engine_url = import.meta.env.DEV ? 'http://localhost:8000' : 'https://hiveai-engine-4ae52c8098bb.herokuapp.com';
  const res = await fetch(`${engine_url}/run/${run_id}/cancel`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // add other headers as needed
    },
  });
  return res.json();
}

export default {
  getOne,
  getMany,
  create,
  update,
  getManyForCompany,
  deleteOne,
  cancelOne,
};
