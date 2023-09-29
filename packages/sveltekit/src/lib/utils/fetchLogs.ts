import type { LogData } from '../../routes/logger/logger.types';

// src/lib/apiUtils.ts
export async function fetchLogs(): Promise<LogData[]> {
  console.info(import.meta.env['VITE_BASE_URL']);
  const response = await fetch(`${import.meta.env['VITE_BASE_URL']}/logs`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
