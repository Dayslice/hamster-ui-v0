import type { LogData } from '../../routes/logger/logger.types';

// src/lib/apiUtils.ts
export async function fetchLogs(): Promise<LogData[]> {
  const response = await fetch(`https://preeminent-crostata-e1435d.netlify.app/logs`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
