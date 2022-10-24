export type LogCategory = "info" | "error" | "debug";
export type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};
export interface Logger {
  log(entry: LogEntry): void;
}
