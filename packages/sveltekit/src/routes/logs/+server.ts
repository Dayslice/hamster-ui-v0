// src/routes/logs/index.json.ts
import path from 'path';
import fs from 'fs';
import { error, json } from '@sveltejs/kit';
/**
 * GET /logs
 */
export async function GET(_): Promise<{ status: number; body: any }> {
  const path_string = './';
  const dir_path = path.resolve(path_string); // Replace this with the actual path you need
  const log_file = path.join(dir_path, 'log.json');

  const log_entries: any[] = [];

  try {
    const fileData = fs.readFileSync(log_file, 'utf-8');
    fileData.split('\n').forEach((line) => {
      if (line.trim()) {
        log_entries.push(JSON.parse(line));
      }
    });
    return json(log_entries);
  } catch (e: any) {
    console.error(e);
    throw error(500, 'problem reading file. try again later.');
  }
}
