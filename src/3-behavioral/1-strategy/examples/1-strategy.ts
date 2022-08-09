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

export class Context {
  private strategy: Strategy = new ConcreteStrategyA(); // default

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public doStuff(param: string): string {
    return this.strategy.doStuff(param);
  }
}

const context = new Context();
console.log(context.doStuff("Hello")); // Hello 🅰️
context.setStrategy(new ConcreteStrategyB());
console.log(context.doStuff("Hello")); // hello 🅱️
