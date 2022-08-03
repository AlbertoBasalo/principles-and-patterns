import * as fs from "fs";
import * as path from "path";

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
class TextFileWriter implements Writer {
  private readonly filePath = path.resolve(__dirname, "./log.txt");
  write(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }
}

class JsonFormatter implements Formatter {
  format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}
class SimpleFormatter implements Formatter {
  format(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}
class LoggerWriterFactory {
  public static createWriter(type: "console" | "textFile"): Writer {
    if (type === "console") {
      return new ConsoleWriter();
    } else {
      return new TextFileWriter();
    }
  }
}

class LoggerFormatterFactory {
  public static createFormatter(type: "json" | "simple"): Formatter {
    if (type === "json") {
      return new JsonFormatter();
    } else {
      return new SimpleFormatter();
    }
  }
}

class Logger {
  constructor(private readonly writer: Writer, private readonly formatter: Formatter) {}
  log(entry: LogEntry) {
    this.writer.write(this.formatter.format(entry));
  }
}

class Client {
  private readonly logger: Logger;
  constructor() {
    const writer = LoggerWriterFactory.createWriter("textFile");
    const formatter = LoggerFormatterFactory.createFormatter("json");
    this.logger = new Logger(writer, formatter);
  }
  log(entry: LogEntry) {
    this.logger.log(entry);
  }
}

const client = new Client();
client.log({
  category: "info",
  message: "Hello World",
  timestamp: new Date(),
});
