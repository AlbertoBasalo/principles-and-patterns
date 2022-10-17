// ! npm run 1-3-2
import * as fs from "fs";
import * as path from "path";
import { LogEntry } from "./log-entry.model";

class Logger {
  private readonly filePath = path.resolve(__dirname, "./log.txt");

  constructor(public formatter: "json" | "simple", public writer: "console" | "textFile") {}

  public log(entry: LogEntry) {
    let message = "";
    // ToDo: 🤢 complex if-else on every log call
    if (this.formatter == "json") {
      message = this.formatJSON(entry);
    } else {
      message = this.formatSimple(entry);
    }
    if (this.writer == "console") {
      this.writeConsole(message);
    } else {
      this.writeFile(message);
    }
    // ToDo: 🤢 what happens when a new formatter or writer arrives?
  }

  private writeConsole(entry: string): void {
    console.log(entry);
  }

  private writeFile(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }

  private formatJSON(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  private formatSimple(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}

// a consumer class
class Client {
  private readonly logger: Logger;
  constructor() {
    // ToDo: 🤢 configure every logger instance
    this.logger = new Logger("simple", "console");
  }
  public log(entry: LogEntry) {
    this.logger.log(entry);
  }
}

// main program
const client = new Client();
client.log({
  category: "info",
  message: "Hello World",
  timestamp: new Date(),
});
