import * as fs from "fs";
import * as path from "path";

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

export class TextFileWriter implements Writer {
  private readonly filePath = path.resolve(__dirname, "./log.txt");
  public write(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }
}

export class SimpleFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}

export class LoggerWriterFactory {
  public static createWriter(type: "console" | "textFile"): Writer {
    if (type === "console") {
      return new ConsoleWriter();
    } else {
      return new TextFileWriter();
    }
  }
}

export class LoggerFormatterFactory {
  public static createFormatter(type: "json" | "simple"): Formatter {
    if (type === "json") {
      return new JsonFormatter();
    } else {
      return new SimpleFormatter();
    }
  }
}

export type LoggerStrategy = { writer: Writer; formatter: Formatter };

export class Logger {
  public defaultStrategy: LoggerStrategy = { writer: new ConsoleWriter(), formatter: new SimpleFormatter() };
  public errorStrategy: LoggerStrategy = { writer: new TextFileWriter(), formatter: new JsonFormatter() };

  public log(entry: LogEntry) {
    if (entry.category === "error") {
      this.writeEntry(entry, this.errorStrategy);
    } else {
      this.writeEntry(entry, this.defaultStrategy);
    }
  }
  private writeEntry(entry: LogEntry, strategy: LoggerStrategy) {
    strategy.writer.write(strategy.formatter.format(entry));
  }
}

export class Client {
  private readonly logger: Logger = new Logger();
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
client.log({
  category: "error",
  message: "The world is ending",
  timestamp: new Date(),
});