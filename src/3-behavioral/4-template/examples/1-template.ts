export abstract class Template {
  public hook1(): void {}
  public abstract step1(): void;
  public hook2(payload = ""): void {
    console.log("✅ Done " + payload);
  }
  public execute(): void {
    this.hook1();
    this.step1();
    this.hook2();
  }
}

export class ConcreteAlfa extends Template {
  public override hook1(): void {
    console.log("🅰️  Hook 1");
  }
  public step1(): void {
    console.log("🅰️  Step 1");
  }
}

export class ConcreteBravo extends Template {
  public step1(): void {
    console.log("🅱️  Step 1");
  }
  public override hook2(): void {}
}

export class ConcreteCharlie extends Template {
  public step1(): void {
    console.log("©️  Step 1");
  }
  public override hook2(): void {
    super.hook2("charlie");
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
