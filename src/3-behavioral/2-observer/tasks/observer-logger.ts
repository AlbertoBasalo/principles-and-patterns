export type LogCategory = "info" | "error" | "debug";
export type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};
export class Logger {
  public log(entry: LogEntry) {
    console.log(JSON.stringify(entry));
  }
}

export interface Observer {
  notify(businessEvent: string, message: string): void;
}

export class LoggerObserver implements Observer {
  private logger: Logger = new Logger();
  public notify(businessEvent: string, message: string) {
    const entry: LogEntry = {
      category: businessEvent === "exception" ? "error" : "info",
      message: message,
      timestamp: new Date(),
    };
    this.logger.log(entry);
  }
}
