// types.ts
export type LogType = 'task' | 'internal_thought' | 'solution' | 'chat' | 'tool';

export interface LogData {
  type: LogType;
  content: string;
  speaker?: string;
  receiver?: string;
  user?: string;
}

export interface LogEntryProps {
  icon: string | null;
  colorName: string;
  title: string;
  content: string | null;
}
