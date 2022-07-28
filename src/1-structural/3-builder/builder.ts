export class Product {
  public id: string = "";
  public timestamp: number = 0;
  public name: string = "";
  public singleProperty?: any;
  public listProperty?: any[];
}

export interface ProductBuilder {
  setId(id: string): ProductBuilder;
  setTimestamp(timestamp: number): ProductBuilder;
  setName(name: string): ProductBuilder;
  setSingleProperty(singleProperty: any): ProductBuilder;
  addListProperty(listProperty: any): ProductBuilder;
  removeListProperty(listProperty: any): ProductBuilder;
  build(): Product;
}

class ProductBuilderImpl implements ProductBuilder {
  private product: Product = new Product();

  public setId(id: string): ProductBuilder {
    this.product.id = id;
    return this;
  }

  public setTimestamp(timestamp: number): ProductBuilder {
    this.product.timestamp = timestamp;
    return this;
  }

  public setName(name: string): ProductBuilder {
    this.product.name = name;
    return this;
  }

  public setSingleProperty(singleProperty: any): ProductBuilder {
    this.product.singleProperty = singleProperty;
    return this;
  }

  public addListProperty(listProperty: any): ProductBuilder {
    this.product.listProperty = this.product.listProperty || [];
    this.product.listProperty.push(listProperty);
    return this;
  }

  public removeListProperty(listProperty: any): ProductBuilder {
    this.product.listProperty = this.product.listProperty || [];
    this.product.listProperty.splice(this.product.listProperty.indexOf(listProperty), 1);
    return this;
  }

  public build(): Product {
    return this.product;
  }
}

class Director {
  private builder: ProductBuilder = new ProductBuilderImpl();
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
    const product = new ProductBuilderImpl()
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