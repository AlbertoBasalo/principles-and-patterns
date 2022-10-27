/* eslint-disable max-lines */
// ! npm run 3-3-1

// * each action is a class with a method for execute the logic
// * and (optionally)
// * a method to undo the logic (if possible)
// * a method to redo the logic (if possible)
export interface Command {
  execute(payload: string): void;
  undo?(payload: string): void;
  redo?(payload: string): void;
}

export class CommandAlfa implements Command {
  constructor(private receiver: Receiver) {}

  public execute(payload: string): void {
    this.receiver.doSomethingAlfa(payload);
  }
  public undo(payload: string): void {
    this.receiver.undoSomethingAlfa(payload);
  }
}
export class CommandBravo implements Command {
  constructor(private receiver: Receiver) {}
  public execute(payload: string): void {
    this.receiver.doSomethingBravo(payload);
  }
  public undo(payload: string): void {
    this.receiver.undoSomethingBravo(payload);
  }
}

// ! A state management class that orchestrate and tracks all business actions
// ! could be simplified without history and redo/undo
export class Invoker {
  // * all available actions
  private catalog: { action: string; command: Command }[] = [];
  // */ all executed actions (a log of business actions)
  private history: { timestamp: number; action: string; payload: string }[] = [];

  public register(action: string, command: Command) {
    this.catalog.push({ action, command });
  }
  // aka execute
  public dispatch(action: string, payload: string): void {
    const actionCommand = this.catalog.find(c => c.action === action);
    if (!actionCommand) {
      throw new Error(`Action ${action} not found`);
    }
    console.log(`▶️ Dispatching action ${action}`);
    actionCommand.command.execute(payload);
    this.history.push({ timestamp: new Date().getTime(), action, payload });
  }

  // ! the following are generic methods not related to the command pattern

  public undo() {
    const lastAction = this.history.at(-1);
    if (!lastAction) {
      throw new Error("No action to undo");
    }
    const actionCommand = this.catalog.find(c => c.action === lastAction.action);
    if (!actionCommand) {
      throw new Error(`Action ${lastAction.action} not found`);
    }
    if (actionCommand.command.undo) {
      console.log(`⏮️ Undoing action ${lastAction.action}`);
      actionCommand.command.undo(lastAction.payload);
      this.history.pop();
    }
  }

  public redo() {
    const lastAction = this.history.at(-1);
    if (!lastAction) {
      throw new Error("No action to redo");
    }
    console.log(`🔁 Redoing action ${lastAction.action}`);
    this.dispatch(lastAction.action, lastAction.payload);
  }

  public printHistory() {
    console.log("📜 Command History:");
    this.history.forEach(h => console.log(h));
  }
}

// * receivers are business objects that implements the logic
// * could be included in the command classes
export class Receiver {
  public doSomethingAlfa(payload: string) {
    console.log(`🅰️ CommandAlfa: ${payload}`);
  }
  public undoSomethingAlfa(payload: string) {
    console.log(`🗑️ 🅰️ CommandAlfa: ${payload}`);
  }
  public doSomethingBravo(payload: string) {
    console.log(`🅱️ CommandBravo: ${payload}`);
  }
  public undoSomethingBravo(payload: string) {
    console.log(`🗑️ 🅱️ CommandBravo: ${payload}`);
  }
}

export class Client {
  private invoker = new Invoker(); // command dispatcher
  private receiver = new Receiver(); // command processor

  constructor() {
    this.registerCommands();
  }

  private registerCommands() {
    const actionAlfa = "alfa";
    this.invoker.register(actionAlfa, new CommandAlfa(this.receiver));
    const actionBravo = "bravo";
    this.invoker.register(actionBravo, new CommandBravo(this.receiver));
  }

  public run() {
    // business process simulation
    this.invoker.dispatch("alfa", "Hello World");
    this.invoker.dispatch("bravo", "Hello World");
    this.invoker.redo();
    this.invoker.undo();
    this.invoker.dispatch("alfa", "Bye bye world");
    this.invoker.dispatch("bravo", "Bye bye world");
    this.invoker.printHistory();
  }
}

const client = new Client();
client.run();
