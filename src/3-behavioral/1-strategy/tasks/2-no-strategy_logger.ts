// ! npm run 3-1-2
import { LogEntry, Logger, LoggerFormatterFactory, LoggerWriterFactory } from "./logger";

export class Client {
  private readonly logger: Logger;
  constructor() {
    // ToDo: 1 choose a strategy based on environment (dev/prod)
    // ToDo: 2 choose a strategy based the entry type (info/error)
    const writer = LoggerWriterFactory.createWriter("textFile");
    const formatter = LoggerFormatterFactory.createFormatter("json");
    this.logger = new Logger(writer, formatter);
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
