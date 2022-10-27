// ! npm run 3-1-3
import { ConsoleWriter, JsonFormatter, LogEntry, Logger, SimpleFormatter, TextFileWriter } from "./logger";

export class LoggerStrategyFactory {
  // * 🤩 having pre-created strategies like a builder director
  private static defaultStrategy = new Logger(new ConsoleWriter(), new SimpleFormatter());
  private static productionStrategy = new Logger(new TextFileWriter(), new JsonFormatter());
  public static chooseLoggerStrategy(): Logger {
    const environment = process.env.NODE_ENV;
    // * 🤩 encapsulated decision (chosen on environment basis)
    if (environment === "production") {
      return this.productionStrategy;
    } else {
      return this.defaultStrategy;
    }
  }
}

export class Client {
  private readonly logger = LoggerStrategyFactory.chooseLoggerStrategy();
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
