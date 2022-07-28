export class Product {
  public id: string = "";
  public timestamp: number = 0;
  public name: string = "";
  public singleProperty?: any;
  public listProperty?: any[];
}

export interface BuildProduct {
  setId(id: string): BuildProduct;
  setTimestamp(timestamp: number): BuildProduct;
  setName(name: string): BuildProduct;
  setSingleProperty(singleProperty: any): BuildProduct;
  addListProperty(listProperty: any): BuildProduct;
  removeListProperty(listProperty: any): BuildProduct;
  build(): Product;
}

class ProductBuilder implements BuildProduct {
  private product: Product = new Product();

  public setId(id: string): BuildProduct {
    this.product.id = id;
    return this;
  }

  public setTimestamp(timestamp: number): BuildProduct {
    this.product.timestamp = timestamp;
    return this;
  }

  public setName(name: string): BuildProduct {
    this.product.name = name;
    return this;
  }

  public setSingleProperty(singleProperty: any): BuildProduct {
    this.product.singleProperty = singleProperty;
    return this;
  }

  public addListProperty(listProperty: any): BuildProduct {
    this.product.listProperty = this.product.listProperty || [];
    this.product.listProperty.push(listProperty);
    return this;
  }

  public removeListProperty(listProperty: any): BuildProduct {
    this.product.listProperty = this.product.listProperty || [];
    this.product.listProperty.splice(this.product.listProperty.indexOf(listProperty), 1);
    return this;
  }

  public build(): Product {
    return this.product;
  }
}

class Director {
  private builder: BuildProduct = new ProductBuilder();
  public build1With2Items(): Product {
    return this.builder
      .setId("1")
      .setTimestamp(1)
      .setName("Product 1")
      .setSingleProperty("singleProperty")
      .addListProperty("listProperty1")
      .addListProperty("listProperty2")
      .build();
  }
  public build2With1Item(): Product {
    return this.builder
      .setId("2")
      .setTimestamp(2)
      .setName("Product 2")
      .setSingleProperty("singleProperty")
      .addListProperty("listProperty1")
      .build();
  }
}

class Client {
  public buildUsingDirector(): void {
    const director = new Director();
    const product = director.build1With2Items();
    console.log(product);
  }
  public buildUsingBuilder(): void {
    const product = new ProductBuilder()
      .setId("1")
      .setTimestamp(1)
      .setName("Product 1")
      .setSingleProperty("singleProperty")
      .addListProperty("listProperty1")
      .addListProperty("listProperty2")
      .build();
    console.log(product);
  }
}

const client = new Client();
client.buildUsingDirector();
client.buildUsingBuilder();