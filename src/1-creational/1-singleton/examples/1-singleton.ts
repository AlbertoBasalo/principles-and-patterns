// ! npm run 1-1-1

class Singleton {
  private static instance: Singleton;
  public readonly timestamp: number = Date.now();
  public readonly payload: unknown;

  constructor() {
    if (!Singleton.instance) {
      this.payload = this.getPayload();
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  public static getInstance(): Singleton {
    return new Singleton();
  }
  private getPayload(): unknown {
    return "payload";
  }
}

// Static consumer class
class ClientA {
  public static main(): void {
    // * access singleton static instance
    const instance = Singleton.getInstance();
    console.log(instance.timestamp);
    console.log(instance.payload);
  }
}
// Dynamic consumer class
class ClientB {
  public doStuff(): void {
    // * access singleton dynamic instance
    const instance = new Singleton();
    console.log(instance.timestamp);
    console.log(instance.payload);
    // * also using the static method
    const instance2 = Singleton.getInstance();
    console.log(instance2.timestamp);
    console.log(instance2.payload);
  }
}

// main program
ClientA.main();
new ClientB().doStuff();
new ClientB().doStuff();
