import { DateTime } from 'luxon';

/**
 *
 * @param iso
 * @returns formatted date string of Sep 29 at 2:29 PM
 */
export function formatCasualDateTime(iso: string): string {
  return DateTime.fromISO(iso).toFormat("MMM dd 'at' h:mm a");
}

/**
 *
 * @param iso
 * @returns formatted duration like 20 minutes or 2 hours and 4 minutes
 */
export function formatDuration(iso_start: string, iso_end: string): string {
  const start = DateTime.fromISO(iso_start);
  const end = DateTime.fromISO(iso_end);

  const diff = end.diff(start, ['hours', 'minutes']);
  const hours = Math.floor(diff.hours);
  const minutes = diff.minutes;
  if (hours > 0) {
    return `${hours} hours and ${minutes} minutes`;
  }
  return `${minutes} minutes`;
}
