export interface ISomething {
  someProperty: unknown;
  someMethod(x: unknown): unknown;
}

export interface IAnything {
  unknownProperty: unknown;
  unknownMethod(x: unknown): unknown;
}

class ConcreteSomethingA implements ISomething {
  public someProperty: unknown = "A";
  public someMethod(x: unknown): unknown {
    return x;
  }
}

class ConcreteSomethingB implements ISomething {
  public someProperty: unknown = "B";
  public someMethod(x: unknown): unknown {
    return x;
  }
}

class ConcreteAnythingA implements IAnything {
  public unknownProperty: unknown = "A";
  public unknownMethod(x: unknown): unknown {
    return x;
  }
}

class ConcreteAnythingB implements IAnything {
  public unknownProperty: unknown = "B";
  public unknownMethod(x: unknown): unknown {
    return x;
  }
}

class SomethingFactory {
  public create(type: string): ISomething {
    if (type === "A") {
      return new ConcreteSomethingA();
    } else {
      return new ConcreteSomethingB();
    }
  }
}

class AnythingFactory {
  public create(type: string): IAnything {
    if (type === "A") {
      return new ConcreteAnythingA();
    } else {
      return new ConcreteAnythingB();
    }
  }
}

class Factory {
  public create(type: string, subType: string): ISomething | IAnything {
    if (type === "Something") {
      return new SomethingFactory().create(subType);
    } else {
      return new AnythingFactory().create(subType);
    }
  }
}

class Client {
  public doStuff(): void {
    const factory = new Factory();
    const instance = factory.create("Something", "A");
    console.log(instance);
    const instance2 = factory.create("Anything", "B");
    console.log(instance2);
  }
}
new Client().doStuff();
