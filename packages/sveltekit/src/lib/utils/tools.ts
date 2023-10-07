export function getDifferences(original: any, updated: any) {
  const changes: Record<string, any> = {};

  for (const key in original) {
    if (original[key] !== updated[key]) {
      changes[key] = updated[key];
    }
  }

  return changes;
}

export function extractFilename(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1];
}
