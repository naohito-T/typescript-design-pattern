class Product {
  private parts: string[] = [];

  public add(part: string): void {
    this.parts.push(part);
  }

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}`);
  }
}

interface Builder {
  buildPartA(): void;
  buildPartB(): void;
  buildPartC(): void;
  getResult(): Product;
}

class ConcreteBuilder implements Builder {
  private product: Product = new Product();

  public buildPartA(): void {
    this.product.add('PartA');
  }

  public buildPartB(): void {
    this.product.add('PartB');
  }

  public buildPartC(): void {
    this.product.add('PartC');
  }

  public getResult(): Product {
    return this.product;
  }
}

class Director {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  public allPartProduct(): void {
    this.builder.buildPartA();
    this.builder.buildPartB();
    this.builder.buildPartC();
  }

  public onePartProduct(): void {
    this.builder.buildPartA();
  }
}

// Client Code
const builder = new ConcreteBuilder();
const director = new Director(builder);

director.allPartProduct();
const product = builder.getResult();
product.listParts();

const builder2 = new ConcreteBuilder();
const director2 = new Director(builder2);
director2.onePartProduct();
const product2 = builder2.getResult();
product2.listParts();
