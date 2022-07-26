export class Singleton {
  private static instance: Singleton;
  public readonly value: any;
  constructor(value: any) {
    if (!Singleton.instance) {
      this.value = value;
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  public static getInstance(): Singleton {
    return Singleton.instance;
  }
}

class ClientA {
  public static main(): void {
    const instance = new Singleton(1);
    console.log(instance.value);
  }
}

ClientA.main();

class ClientB {
  public doStuff(): void {
    const instance = new Singleton(2);
    console.log(instance.value);
    const instance2 = new Singleton(3);
    console.log(instance2.value);
  }
}
new ClientB().doStuff();

// ts-node .\src\1-structural\1-singleton\singleton-value.ts

