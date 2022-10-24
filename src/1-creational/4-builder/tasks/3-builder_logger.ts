// ! npm run 1-4-3

import { LogEntry } from "./log-entry.model";
import {
  ConsoleWriter,
  Formatter,
  JsonFormatter,
  Logger,
  SimpleFormatter,
  TextFileWriter,
  Writer,
} from "./logger.service";

// * 🤩 builder ensures that the client class will not need to know too much about the logger
class LoggerBuilder {
  public static build(formatter: Formatter, writer: Writer): Logger {
    if (formatter instanceof JsonFormatter && writer instanceof TextFileWriter) {
      // * 🤩 detects incompatibility before the logger is created
      throw "Incompatible formatter";
    }
    const logger = new Logger();
    // * 🤩 ensures correct order
    logger.setFormatter(new JsonFormatter());
    logger.setWriter(new ConsoleWriter());
    return logger;
  }
  // ! alternatively could be implemented as a dynamic flow
}

// * 🤩 director is an abstraction on top of the builder to give clients what they want without knowing the internals
class LoggerDirector {
  public static buildDefault(): Logger {
    return LoggerBuilder.build(new SimpleFormatter(), new TextFileWriter());
  }
  public static buildFancy(): Logger {
    return LoggerBuilder.build(new JsonFormatter(), new ConsoleWriter());
  }
}

// * 🤩 consumer is way simpler
class Client {
  private readonly logger: Logger;
  constructor() {
    this.logger = LoggerDirector.buildDefault();
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
