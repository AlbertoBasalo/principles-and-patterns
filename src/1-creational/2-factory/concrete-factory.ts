export interface ISomething {
  someProperty: any;
  someMethod(x: any): any;
}

export class ConcreteA implements ISomething {
  public someProperty: any = "A";
  public someMethod(x: any): any {
    return x;
  }
}

export class ConcreteB implements ISomething {
  public someProperty: any = "B";
  public someMethod(x: any): any {
    return x;
  }
}

export class Factory {
  public create(type: string): ISomething {
    if (type === 'A') {
      return new ConcreteA();
    } else {
      return new ConcreteB();
    }
  }
}

export class Client {
  public doStuff(): void {
    const factory = new Factory();
    const instance = factory.create('A');
    console.log(instance.someProperty);
    const instance2 = factory.create('B');
    console.log(instance2.someProperty);
  }
}
new Client().doStuff();
