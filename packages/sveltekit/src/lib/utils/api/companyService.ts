import type { Company } from '$entities/company.entity';
import { get, post, patch } from './base';
async function getOne(id: string): Promise<Company> {
  return get<Company>(`company/${id}`);
}

async function getMany(): Promise<Company[]> {
  return get<Company[]>(`company`);
}

async function create(data: Partial<Company>): Promise<Company> {
  return post<Company>('company', data);
}

async function update(id: string, data: Partial<Company>): Promise<Company> {
  return patch<Company>(`company/${id}`, data);
}

export default {
  getOne,
  getMany,
  create,
  update,
};
