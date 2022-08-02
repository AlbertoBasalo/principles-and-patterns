export interface Prototype<T> {
  clone(): T;
}

export class Product implements Prototype<Product> {
  public id: string = "";
  public timestamp: number = 0;
  public name: string = "";
  public singleProperty?: any;

  public clone(): Product {
    const clone = new Product();
    clone.id = Math.random().toString();
    clone.timestamp = new Date().getTime();
    clone.name = this.name;
    clone.singleProperty = this.singleProperty;
    return clone;
  }

}

export class Client {
  public static main(): void {
    const product = new Product();
    product.id = "1";
    product.timestamp = 1;
    product.name = "Product 1";
    product.singleProperty = "Single property";

    const product2 = product.clone();
    product2.name = "Product 2";
    product2.singleProperty = "Single property 2";

    console.log(product);
    console.log(product2);
  }
}

Client.main();