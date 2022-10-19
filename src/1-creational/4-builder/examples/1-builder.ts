// ! npm run 1-4-1
// a complex product to be built
class Product {
  public id = "";
  public timestamp = 0;
  public name = "";
  public arrayProperty: unknown[] = [];
}

interface BuildProduct {
  setName(name: string): BuildProduct;
  addArrayItem(item: unknown): BuildProduct;
  build(): Product;
}

class ProductBuilder implements BuildProduct {
  private product: Product = new Product();

  public setName(name: string): BuildProduct {
    this.product.name = name;
    this.product.id = name.toLocaleLowerCase().replace(/\s/g, "-");
    return this;
  }
  public addArrayItem(item: unknown): BuildProduct {
    this.product.arrayProperty = this.product.arrayProperty || [];
    this.product.arrayProperty.push(item);
    return this;
  }
  public build(): Product {
    this.product.timestamp = new Date().getTime();
    return this.product;
  }
}

class Director {
  // * drives the creation of a products
  // * exposes a catalog of products via methods
  public buildProduct1With2Items(): Product {
    const product = new ProductBuilder()
      .setName("Product 1")
      .addArrayItem("Array property 1")
      .addArrayItem("Array property 2")
      .build();
    return product;
  }
  public buildProduct2With1Item(): Product {
    const product = new ProductBuilder()
      .setName("Product number 2")
      .addArrayItem("Array value 1 for product number 2")
      .build();
    return product;
  }
}
export class Client {
  private product: Product | null = null;
  public buildProduct(productNumber: number): Product {
    if (productNumber == 1) {
      this.product = new ProductBuilder()
        .setName("Product 1")
        .addArrayItem("Array value 1")
        .addArrayItem("Array value 2")
        .build();
    } else {
      this.product = new ProductBuilder()
        .setName("Product number 2")
        .addArrayItem("Array value 1 for product number 2")
        .build();
    }
    return this.product;
  }
  public buildUsingDirector(productNumber: number): Product {
    // * alternative abstracting the building process
    // * the client code is simplified
    if (productNumber == 1) {
      this.product = new Director().buildProduct1With2Items();
    } else {
      this.product = new Director().buildProduct2With1Item();
    }
    return this.product;
  }
}

// main program
const client = new Client();
// ! using the builder
const builderProduct1 = client.buildProduct(1);
console.log("👷🏼 Builder 1️⃣", builderProduct1);
const builderProduct2 = client.buildProduct(2);
console.log("👷🏼 Builder 2️⃣", builderProduct2);
// ! using director variation
const directorProduct1 = client.buildUsingDirector(1);
console.log("👔 Director 1️⃣", directorProduct1);
const directorProduct2 = client.buildUsingDirector(2);
console.log("👔 Director 2️⃣", directorProduct2);
