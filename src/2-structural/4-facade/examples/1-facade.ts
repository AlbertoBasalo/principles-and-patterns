// ! npm run 2-4-1
import { Alpha, Bravo, Charlie } from "./0-no-facade";

export class Facade {
  // * 🤩 hide the internals
  private alpha = new Alpha();

  public doSomethingAlpha(param: string): string {
    const alphaResult = this.alpha.methodAlpha(param);
    return alphaResult;
  }
  // * 🤩 be as expressive as needed
  public doSomethingBravoCharlie(param: string): string {
    const alphaResult = this.alpha.methodAlpha(param);
    const bravo = new Bravo();
    const bravoResult = bravo.methodBravo(alphaResult.length);
    const charlie = new Charlie();
    const charlieResult = charlie.methodCharlie(param);
    return bravoResult + charlieResult;
  }
}

export class Client {
  // * 🤩 only one dependency
  private facade = new Facade();
  // * 🤩 the easiest way
  public doSomethingAlpha(): string {
    return this.facade.doSomethingAlpha("1");
  }
  public doSomethingBravoCharlie(): string {
    return this.facade.doSomethingBravoCharlie("1");
  }
}

const client = new Client();
console.log("client", client.doSomethingAlpha());
console.log("client", client.doSomethingBravoCharlie());
