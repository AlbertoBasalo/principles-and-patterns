// ! npm run 3-3-1

// * each action is a class with a method for execute the logic
// * and (optionally)
// * a method to undo the logic (if possible)
// * a method to redo the logic (if possible)
export interface Command {
  receiver: Receiver;
  payload: string;
  execute(): void;
  undo?(): void;
  redo?(): void;
}
export class CommandAlfa implements Command {
  public receiver: Receiver = new Receiver();
  constructor(public payload: string) {
    this.payload = payload;
  }
  public execute(): void {
    this.receiver.doSomethingAlfa(this.payload);
  }
}
export class CommandBravo implements Command {
  public receiver: Receiver = new Receiver();
  constructor(public payload: string) {
    this.payload = payload;
  }
  public execute(): void {
    this.receiver.doSomethingBravo(this.payload);
  }
}

export class Invoker {
  public dispatch(command: Command): void {
    console.log(`▶️ Dispatching action ${command.constructor.name}`);
    command.execute();
  }
}

// * receivers are business objects that implements the logic
// * could be included in the command classes
export class Receiver {
  public doSomethingAlfa(payload: string) {
    console.log(`🅰️ Alfa: ${payload}`);
  }
  public doSomethingBravo(payload: string) {
    console.log(`🅱️ Bravo: ${payload}`);
  }
}

export class Client {
  private invoker = new Invoker(); // command dispatcher

  public run() {
    // * business process simulation
    this.invoker.dispatch(new CommandAlfa("Hello World"));
    this.invoker.dispatch(new CommandBravo("Hello World"));
    // * could be serialized and stored in a database for latest processing
    this.invoker.dispatch(new CommandAlfa("Bye bye world"));
    this.invoker.dispatch(new CommandBravo("Bye bye world"));
  }
}

const client = new Client();
client.run();
