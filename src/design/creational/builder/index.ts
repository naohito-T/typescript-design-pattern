import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface BuilderAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Builder extends BaseCommand<BuilderAnswer> implements DesignPatternInfo {
  protected readonly question;

  constructor(
    private readonly p: PromptModule,
    private readonly c: Chalk,
    private readonly logger: ILogger,
  ) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${this.c.bold.blue(
          `Creationalの項目から実行するパターンを選んでください。\n`,
        )}`,
        choices: [
          { name: 'help' },
          { name: 'exec' },
          { name: 'description' },
          { name: 'flow-chart' },
          { name: 'example-code' },
        ],
      },
    });
  }

  public run = async (): Promise<void> => {
    const answers = await this.p(this.question);
    await this.handler(answers);
  };

  protected handler = async (answers: BuilderAnswer): Promise<void> => {
    this.logger.debug(`Builder answers: ${JSON.stringify(answers)}`);

    const outputMsg: string[] = [];

    answers.outputs.forEach((option) => {
      if (option === 'help') {
        console.log('helpが選択されました');
        return; // 脱出するように
      } else if (option === 'exec') {
        console.log('execが選択されました');
        this.exec();
        return; // 脱出するように
      } else if (option === 'description') {
        outputMsg.push(this.description());
      } else if (option === 'flow-chart') {
        outputMsg.push(this.flowChart());
      } else if (option === 'example-code') {
        outputMsg.push(this.exampleCode());
      }
    });

    outputMsg.forEach((msg) => console.log(msg));
  };

  public description = () => `
${this.c.bold.bgGreen(`[description]`)}
`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${this.c.bold.bgGreen(`[example code]`)}
`;

  public exec = (): void => {
    this.c.bold.bgGreen(`[Exec code]`);

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
  };
}
