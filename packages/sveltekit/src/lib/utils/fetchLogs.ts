import type { LogData } from '../../routes/logger/logger.types';
// src/lib/apiUtils.ts
export async function fetchLogs(run_id: string): Promise<LogData[]> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://preeminent-crostata-e1435d.netlify.app/';
  const response = await fetch(`${url}/log?filter=run_id||$eq||${run_id}&join=source_agent`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchWorkflow(id: string): Promise<LogData[]> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://preeminent-crostata-e1435d.netlify.app/';
  const response = await fetch(`${url}/workflow/${id}?join=step&join=agent`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchAgents(): Promise<LogData[]> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://preeminent-crostata-e1435d.netlify.app/';
  const response = await fetch(`${url}/agent`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchRun(id: string): Promise<LogData[]> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://preeminent-crostata-e1435d.netlify.app/';
  const response = await fetch(`${url}/run/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
export async function fetchRuns(company_id: string): Promise<LogData[]> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://preeminent-crostata-e1435d.netlify.app/';
  const response = await fetch(`${url}/run?filter=company_id||$eq||${company_id}&join=workflow`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
export async function fetchSteps(workflow_id: string): Promise<LogData[]> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://preeminent-crostata-e1435d.netlify.app/';
  const response = await fetch(`${url}/step?filter=workflow_id||$eq||${workflow_id}&join=primary_agent&join=other_agents`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchCompany(id: string): Promise<LogData[]> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://preeminent-crostata-e1435d.netlify.app/';
  const response = await fetch(`${url}/company/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
