export interface ISomething {
  someProperty: string;
  someMethod(param: string): string;
}

export class ConcreteA implements ISomething {
  public someProperty = "A";
  public someMethod(param: string): string {
    return param;
  }
}

export class ConcreteB implements ISomething {
  public someProperty = "B";
  public someMethod(param: string): string {
    return param.toLocaleLowerCase();
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
    const instanceA = factory.create("A");
    console.log("🅰️ Some property", instanceA.someProperty);
    console.log("🅰️ Some method", instanceA.someMethod("Hello"));
    const instanceB = factory.create("B");
    console.log("🅱️ Some property", instanceB.someProperty);
    console.log("🅱️ Some method", instanceB.someMethod("Goodbye"));
  }
}
new Client().doStuff();
