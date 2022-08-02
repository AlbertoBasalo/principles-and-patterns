

export interface ISomething {
  someProperty: any;
  someMethod(x: any): any;
}

export interface IAnything {
  anyProperty: any;
  anyMethod(x: any): any;
}

class ConcreteSomethingA implements ISomething {
  public someProperty: any = "A";
  public someMethod(x: any): any {
    return x;
  }
}

class ConcreteSomethingB implements ISomething {
  public someProperty: any = "B";
  public someMethod(x: any): any {
    return x;
  }
}

class ConcreteAnythingA implements IAnything {
  public anyProperty: any = "A";
  public anyMethod(x: any): any {
    return x;
  }
}

class ConcreteAnythingB implements IAnything {
  public anyProperty: any = "B";
  public anyMethod(x: any): any {
    return x;
  }
}


class SomethingFactory {
  public create(type: string): ISomething {
    if (type === 'A') {
      return new ConcreteSomethingA();
    } else {
      return new ConcreteSomethingB();
    }
  }
}

class AnythingFactory {
  public create(type: string): IAnything {
    if (type === 'A') {
      return new ConcreteAnythingA();
    } else {
      return new ConcreteAnythingB();
    }
  }
}

class Factory {
  public create(type: string, subType: string): ISomething | IAnything {
    if (type === 'Something') {
      return new SomethingFactory().create(subType);
    } else {
      return new AnythingFactory().create(subType);
    }
  }
}

class Client {
  public doStuff(): void {
    const factory = new Factory();
    const instance = factory.create('Something', 'A');
    console.log(instance);
    const instance2 = factory.create('Anything', 'B');
    console.log(instance2);
  }
}
new Client().doStuff();
