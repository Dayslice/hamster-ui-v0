export function getDifferences(original: any, updated: any) {
  const changes: Record<string, any> = {};

  for (const key in original) {
    if (original[key] !== updated[key]) {
      changes[key] = updated[key];
    }
  }

  return changes;
}
