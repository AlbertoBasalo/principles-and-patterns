// ! npm run 3-1-1
export interface Strategy {
  doStuff(param: string): string;
}
export class ConcreteStrategyA implements Strategy {
  public doStuff(param: string): string {
    return `${param} 🅰️`;
  }
}
export class ConcreteStrategyB implements Strategy {
  public doStuff(param: string): string {
    return `${param.toLowerCase()} 🅱️`;
  }
}

// * 🤩 encapsulated decisions maker
export class Context {
  private static strategy: Strategy = Context.chooseByEnvironment();
  public static getStrategy(): Strategy {
    return Context.strategy;
  }
  public getStrategy(criteria: unknown): Strategy {
    return this.chooseByCriteria(criteria);
  }
  private static chooseByEnvironment(): Strategy {
    // ToDo: choose a strategy based on environment
    return new ConcreteStrategyA();
  }
  private chooseByCriteria(criteria: unknown): Strategy {
    // ToDo: choose a strategy based on criteria value
    return new ConcreteStrategyB();
  }
}

class Client {
  private strategy!: Strategy;

  public doStuff(param: string): string {
    this.strategy = Context.getStrategy();
    return this.strategy.doStuff(param);
  }
  public doMoreStuff(criteria: string, param: string): string {
    this.strategy = new Context().getStrategy(criteria);
    return this.strategy.doStuff(param);
  }
}

// main program
const client = new Client();
console.log(client.doStuff("Hello")); // Hello 🅰️
console.log(client.doMoreStuff("B", "Hello")); // hello 🅱️
