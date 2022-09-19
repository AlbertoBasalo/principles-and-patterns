import { CommonEvent, CommonEventService } from "./common-event.library";

export type LogCategory = "info" | "error" | "debug";
export type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};

export interface Writer {
  write(entry: string): void;
}
export interface Formatter {
  format(entry: LogEntry): string;
}

export class ConsoleWriter implements Writer {
  public write(entry: string): void {
    console.log(entry);
  }
}
export class JsonFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}

export class CommonEventFormatAdapter implements Formatter {
  private readonly commonEventService: CommonEventService = new CommonEventService();

  public format(entry: LogEntry): string {
    // ! adapt ours to theirs
    const commonEvent = this.adaptLogEntryToCommonEvent(entry);
    // ! make use of adapted functionality
    const commonEventMessage = this.commonEventService.createMessage(commonEvent);
    // ! adapt theirs to ours
    const logMessage = this.adaptCommonEventToLogMessage(commonEventMessage);
    return logMessage;
  }

  private adaptLogEntryToCommonEvent(entry: LogEntry): CommonEvent {
    return {
      date: entry.timestamp,
      host: "localhost",
      device: "myApp",
      severity: entry.category === "info" ? 0 : 1,
      extension: [`msg=${entry.message}`],
    };
  }
  private adaptCommonEventToLogMessage(eventMessage: string[]): string {
    return eventMessage.join("\n");
  }
}
export class Logger {
  constructor(private readonly formatter: Formatter, private readonly writer: Writer) {}

  public log(entry: LogEntry) {
    this.writer.write(this.formatter.format(entry));
  }
}

export class Client {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(new CommonEventFormatAdapter(), new ConsoleWriter());
  }
  public doThings() {
    this.logger.log({
      category: "info",
      message: "Hello World",
      timestamp: new Date(),
    });
  }
}

const client = new Client();
client.doThings();
