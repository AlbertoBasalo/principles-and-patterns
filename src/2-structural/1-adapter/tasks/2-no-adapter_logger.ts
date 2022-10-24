// ! npm run 2-1-2
import { CommonEventService } from "./common-event.library";

export class Client {
  // ToDo: 🤢 client classes depending on concrete implementations
  private readonly logger!: CommonEventService;
  constructor() {
    // ToDo: 🤢 client classes are coupled to the library
    this.logger = new CommonEventService();
  }
  public doThings() {
    // ToDo: 🤢 client classes are coupled to the interface
    const message = this.logger.createMessage({
      date: new Date(),
      host: "localhost",
      device: "myApp",
      severity: 0,
      extension: ["msg=Hello World"],
    });
    this.logger.writeMessage(message);
  }
}

// main program
const client = new Client();
client.doThings();
