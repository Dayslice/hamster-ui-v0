import type { LogData } from '../../routes/logger/logger.types';
// src/lib/apiUtils.ts
export async function fetchLogs(): Promise<LogData[]> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://preeminent-crostata-e1435d.netlify.app/';
  const response = await fetch(`${url}/logs`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
