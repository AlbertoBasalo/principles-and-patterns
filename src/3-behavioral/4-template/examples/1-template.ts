// ! npm run 3-4-1

// * an abstraction of a business action
export abstract class Template {
  // * the real business action
  public execute(): void {
    // * execution order assured
    this.hook1();
    this.step1();
    this.hook2();
  }

  // * an optional method should be overridden
  public hook1(): void {}

  // * mandatory steps
  public abstract step1(): void;

  // * default implementation if not overridden
  public hook2(payload = ""): void {
    console.log("✅ Done " + payload);
  }
}

// * implementers can override some optional hooks
// * but must implement all mandatory steps

export class ConcreteAlfa extends Template {
  public override hook1(): void {
    console.log("🅰️  Hook 1 OVERRIDDEN");
  }
  public step1(): void {
    console.log("🅰️  Step 1 SURROUNDED BY HOOKS");
  }
}

export class ConcreteBravo extends Template {
  // * no hook 1

  public step1(): void {
    console.log("🅱️  Step 1 ALONE");
  }
  public override hook2(): void {} // * no hook 2 also
}

export class ConcreteCharlie extends Template {
  public step1(): void {
    console.log("©️ Step 1 CUSTOMIZED");
  }
  public override hook2(): void {
    super.hook2("charlie"); // * customized hook 2
  }
}

export class Client {
  private alfa = new ConcreteAlfa();
  private bravo = new ConcreteBravo();
  private charlie = new ConcreteCharlie();
  public run(): void {
    this.alfa.execute();
    this.bravo.execute();
    this.charlie.execute();
  }
}

const client = new Client();
client.run();
