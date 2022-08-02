export interface ISomething {
  someProperty: unknown;
  someMethod(x: unknown): unknown;
}

export class ConcreteA implements ISomething {
  public someProperty: unknown = "A";
  public someMethod(x: unknown): unknown {
    return x;
  }
}

export class ConcreteB implements ISomething {
  public someProperty: unknown = "B";
  public someMethod(x: unknown): unknown {
    return x;
  }
}

export class Factory {
  public create(type: string): ISomething {
    if (type === "A") {
      return new ConcreteA();
    } else {
      return new ConcreteB();
    }
  }
}

export class Client {
  public doStuff(): void {
    const factory = new Factory();
    const instance = factory.create("A");
    console.log(instance.someProperty);
    const instance2 = factory.create("B");
    console.log(instance2.someProperty);
  }
}
new Client().doStuff();
