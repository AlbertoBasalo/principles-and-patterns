// ! npm run 1-3-2
import * as fs from "fs";
import * as path from "path";
import { LogEntry } from "./log-entry.model";

// * interfaces
interface Formatter {
  format(entry: LogEntry): string;
}
interface Writer {
  write(entry: string): void;
}

// * concrete implementations
class JsonFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}
class SimpleFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}
class ConsoleWriter implements Writer {
  public write(entry: string): void {
    console.log(entry);
  }
}
class TextFileWriter implements Writer {
  private readonly filePath = path.resolve(__dirname, "./log.txt");
  public write(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }
}

// * factories
class LoggerFormatterFactory {
  private static readonly default = "simple";
  public static createFormatter(type: "json" | "simple"): Formatter {
    if (!type) {
      // ! could be based on environment variables instead of concrete parameters
      type = LoggerFormatterFactory.default;
    }
    if (type === "json") {
      return new JsonFormatter();
    } else {
      return new SimpleFormatter();
    }
  }
}
class LoggerWriterFactory {
  public static createWriter(type: "console" | "textFile"): Writer {
    if (type === "console") {
      return new ConsoleWriter();
    } else {
      return new TextFileWriter();
    }
    // ! could be implemented as an structure to avoid if-else logic
  }
}

class Logger {
  constructor(private readonly formatter: Formatter, private readonly writer: Writer) {}
  public log(entry: LogEntry) {
    // * much cleaner
    const message = this.formatter.format(entry);
    this.writer.write(message);
  }
}

class Client {
  private readonly logger: Logger;
  constructor() {
    // * use factories to instantiate objects of certain types
    const formatter = LoggerFormatterFactory.createFormatter("json");
    const writer = LoggerWriterFactory.createWriter("textFile");
    this.logger = new Logger(formatter, writer);
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
