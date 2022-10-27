import { Agency } from "./receiver";

export interface Command {
  receiver: Agency;
  payload: unknown;
  execute(): string;
  undo?(): string;
}

// * A state management class that orchestrate and tracks all business actions
// ! could be simplified without history and redo/undo

export class Invoker {
  // */ all executed actions (a log of business actions)
  private history: { timestamp: number; command: Command; result: string }[] = [];

  public dispatch(command: Command): string {
    console.log(`▶️ Dispatching action ${command.constructor.name}`);
    const result = command.execute();
    this.history.push({ timestamp: new Date().getTime(), command, result });
    return result;
  }
  public undo() {
    const lastAction = this.history.at(-1);
    if (lastAction && lastAction.command.undo) {
      console.log(`⏮️ Undoing action ${lastAction}`);
      lastAction.command.undo();
      this.history.pop();
    }
    console.log("⏮️ No action undone");
  }
  public printHistory() {
    console.log("📜 Command History:");
    this.history.forEach(h => console.log(h));
  }
}
