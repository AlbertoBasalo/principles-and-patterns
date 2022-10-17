// ! npm run 1-3-1

interface Something {
  someProperty: string;
  someMethod(param: string): string;
}

// type or enum
type TypesCatalog = "A" | "B" | "C";

// * concrete implementations

class ConcreteA implements Something {
  public someProperty = "🅰️";
  public someMethod(param: string): string {
    return param.toLocaleUpperCase();
  }
}

class ConcreteB implements Something {
  public someProperty = "🅱️";
  public someMethod(param: string): string {
    return param.toLocaleLowerCase();
  }
}

class Factory {
  // * Factory method
  public create(type: TypesCatalog): Something {
    if (type === "A") {
      return new ConcreteA();
    } else {
      return new ConcreteB();
    }
    // ! use an structure instead of conditionals
  }
}

// class consumer
export class Client {
  public doStuff(): void {
    const factory = new Factory();
    const instanceA = factory.create("A");
    console.log("🅰️ -> Some property:", instanceA.someProperty);
    console.log("🅰️ -> Some method:", instanceA.someMethod("Hello"));
    // * same factory also creates a different instance
    const instanceB = factory.create("B");
    console.log("🅱️ -> Some property:", instanceB.someProperty);
    console.log("🅱️ -> Some method:", instanceB.someMethod("Goodbye"));
  }
}

// main program
new Client().doStuff();
