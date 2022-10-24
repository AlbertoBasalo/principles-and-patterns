// ! npm run 1-4-2

import { LogEntry } from "./log-entry.model";
import { ConsoleWriter, JsonFormatter, Logger } from "./logger.service";

class Client {
  private readonly logger: Logger;
  constructor() {
    // ToDo: 🤢 client classes will need to know too much about me
    this.logger = new Logger();
    // ToDo: 🤢 client classes needs to call formatter before
    this.logger.setFormatter(new JsonFormatter());
    // ToDo: 🤢 client classes takes care of the incompatibility
    this.logger.setWriter(new ConsoleWriter());
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
