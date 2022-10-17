import { LogCategory } from "./log-category.enum";

export type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};
