// ! npm run 2-2-1
// lower level interface and concrete classes
export interface Implementation {
  // ! the name implementation is a convention
  workHard(): string;
}
export class ImplementationWorker implements Implementation {
  public workHard(): string {
    return "👷🏼 Implementation working hard";
  }
}
export class ImplementationStudent implements Implementation {
  public workHard(): string {
    return "🧑🏼‍🎓 Implementation student studying hard";
  }
}

// higher level interface and concrete classes
export interface Abstraction {
  // ! the name abstraction is a convention
  doStuff(): string;
}
export class AbstractionManager implements Abstraction {
  constructor(private readonly implementation: Implementation) {}

  public doStuff(): string {
    console.log("👔 Abstraction doing things");
    const result = this.implementation.workHard();
    return "Managing " + result.toUpperCase();
  }
}
export class AbstractionTeacher implements Abstraction {
  constructor(private readonly implementation: Implementation) {}

  public doStuff(): string {
    console.log("🧑🏼‍🏫 Abstraction doing things");
    const result = this.implementation.workHard();
    return "Teaching " + result.toUpperCase();
  }
}

export class Client {
  // two very different features
  private readonly abstraction1: Abstraction = new AbstractionManager(new ImplementationWorker());
  private readonly abstraction2: Abstraction = new AbstractionTeacher(new ImplementationStudent());

  // working the same way
  public doStuff1(): string {
    return this.abstraction1.doStuff();
  }
  public doStuff2(): string {
    return this.abstraction2.doStuff();
  }
}

const client = new Client();
console.log(client.doStuff1());
console.log(client.doStuff2());
