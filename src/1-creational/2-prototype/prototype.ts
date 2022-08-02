export interface Prototype<T> {
  clone(): T;
}

export class Product implements Prototype<Product> {
  public id: string = "";
  public timestamp: number = 0;
  public name: string = "";
  public singleProperty?: any;
  public listProperty: any[] = [];

  public clone(): Product {
    const clone = new Product();
    // this.shallowClone(clone);
    this.deepClone(clone);
    return clone;
  }

  private shallowClone(clone: Product) {
    clone.id = Math.random().toString();
    clone.timestamp = new Date().getTime();
    clone.name = this.name;
    clone.singleProperty = this.singleProperty;
    clone.listProperty = this.listProperty;
  }

  private deepClone(clone: Product) {
    clone.id = Math.random().toString();
    clone.timestamp = new Date().getTime();
    clone.name = this.name;
    clone.singleProperty = this.singleProperty;
    clone.listProperty = [];
    // ToDo: deep clone listProperty items
    clone.listProperty = this.listProperty.map(item => item);
  }

}

export class Client {
  public static main(): void {
    const product = new Product();
    product.id = "1";
    product.timestamp = 1;
    product.name = "Product 1";
    product.singleProperty = "Single property";
    product.listProperty = ["List property 1", "List property 2"];

    const product2 = product.clone();
    product2.name = "Product 2";
    product2.singleProperty = "Single property 2";
    product2.listProperty.push("List property 3");
    product2.listProperty[0] = "List property 1 2";

    console.log(product);
    console.log(product2);
  }
}

Client.main();