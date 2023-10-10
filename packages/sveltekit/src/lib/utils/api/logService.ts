import type { Log } from '$entities/log.entity';
import { get, post, patch } from './base';
async function getOne(id: string, queryParams: Record<string, string> | string[][] = {}): Promise<Log> {
  const params: URLSearchParams = new URLSearchParams(queryParams);
  return get<Log>(`log/${id}?${params.toString()}`);
}

async function getMany(queryParams: Record<string, string> | string[][]): Promise<Log[]> {
  const params: URLSearchParams = new URLSearchParams(queryParams);
  return get<Log[]>(`log?${params.toString()}`);
}

async function create(data: Partial<Log>): Promise<Log> {
  return post<Log>('log', data);
}

async function update(id: string, data: Partial<Log>): Promise<Log> {
  return patch<Log>(`log/${id}`, data);
}

export default {
  getOne,
  getMany,
  create,
  update,
};
