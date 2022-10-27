export interface Command {
  execute(payload: string): string;
  undo?(payload: string): void;
}

// * A state management class that orchestrate and tracks all business actions
// ! could be simplified without history and redo/undo

export class Invoker {
  // * all available actions
  private catalog: { action: string; command: Command }[] = [];
  // */ all executed actions (a log of business actions)
  private history: { timestamp: number; action: string; payload: string; result: string }[] = [];

  public register(action: string, command: Command) {
    this.catalog.push({ action, command });
  }

  public dispatch(action: string, payload: string): string {
    const actionCommand = this.catalog.find(c => c.action === action);
    if (!actionCommand) {
      throw new Error(`Action ${action} not found`);
    }
    console.log(`▶️ Dispatching action ${action}`);
    const result = actionCommand.command.execute(payload);
    this.history.push({ timestamp: new Date().getTime(), action, payload, result });
    return result;
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
