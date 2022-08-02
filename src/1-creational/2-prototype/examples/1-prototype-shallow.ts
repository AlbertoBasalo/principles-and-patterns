export interface Prototype<T> {
  clone(): T;
}

export class Product implements Prototype<Product> {
  public id = "";
  public timestamp = 0;
  public name = "";
  public singleProperty?: unknown;

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
    const product1 = Client.getProduct1();
    const product2 = Client.getProduct2(product1);
    console.log(product1);
    console.log(product2);
  }

  private static getProduct2(product: Product) {
    const product2 = product.clone();
    product2.name = "Product 2";
    product2.singleProperty = "Single property 2";
    return product2;
  }

  private static getProduct1() {
    const product = new Product();
    product.id = "1";
    product.timestamp = 1;
    product.name = "Product 1";
    product.singleProperty = "Single property";
    return product;
  }
}

Client.main();
