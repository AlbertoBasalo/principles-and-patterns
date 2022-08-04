import { CommonEventFormatter } from "./common-event.format";

type LogCategory = "info" | "error" | "debug";
type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};

interface Writer {
  write(entry: string): void;
}
interface Formatter {
  format(entry: LogEntry): string;
}

class ConsoleWriter implements Writer {
  write(entry: string): void {
    console.log(entry);
  }
}
class JsonFormatter implements Formatter {
  format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}

class CommonEventFormatAdapter implements Formatter {
  private readonly formatter: CommonEventFormatter = new CommonEventFormatter();

  format(entry: LogEntry): string {
    const commonEvent = this.adaptLogEntryToCommonEvent(entry);
    const eventMessage = this.formatter.createMessage(commonEvent);
    const logMessage = this.adaptCommonEventToLogMessage(eventMessage);
    return logMessage;
  }

  private adaptLogEntryToCommonEvent(entry: LogEntry) {
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
class Logger {
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
  public log(entry: LogEntry) {
    this.logger.log(entry);
  }
}

const client = new Client();
client.log({
  category: "info",
  message: "Hello World",
  timestamp: new Date(),
});
