import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface VisitorAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Visitor extends BaseCommand<VisitorAnswer> implements DesignPatternInfo {
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
          `Visitorの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: VisitorAnswer): Promise<void> => {
    this.logger.debug(`Visitor answers: ${JSON.stringify(answers)}`);

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
    // この例では、`ConcreteElementA` と `ConcreteElementB` の2つの構造が `Visitor` インターフェイスを通じて異なる操作を受け入れることができます。オブジェクトの構造や操作が変わった場合、Visitor の実装を変更するだけでよく、既存のクラスを変更する必要はありません。

    // Element interface
    interface Element {
      accept(visitor: Visitor): void;
    }

    // Concrete elements
    class ConcreteElementA implements Element {
      accept(visitor: Visitor): void {
        visitor.visitConcreteElementA(this);
      }

      operationA(): void {
        console.log('ConcreteElementA operation');
      }
    }

    class ConcreteElementB implements Element {
      accept(visitor: Visitor): void {
        visitor.visitConcreteElementB(this);
      }

      operationB(): void {
        console.log('ConcreteElementB operation');
      }
    }

    // Visitor interface
    interface Visitor {
      visitConcreteElementA(concreteElementA: ConcreteElementA): void;
      visitConcreteElementB(concreteElementB: ConcreteElementB): void;
    }

    // Concrete visitor
    class ConcreteVisitor implements Visitor {
      visitConcreteElementA(concreteElementA: ConcreteElementA): void {
        console.log('Visiting ConcreteElementA');
        concreteElementA.operationA();
      }

      visitConcreteElementB(concreteElementB: ConcreteElementB): void {
        console.log('Visiting ConcreteElementB');
        concreteElementB.operationB();
      }
    }

    // Client code
    const elementA = new ConcreteElementA();
    const elementB = new ConcreteElementB();
    const visitor = new ConcreteVisitor();

    elementA.accept(visitor); // Output: Visiting ConcreteElementA followed by ConcreteElementA operation
    elementB.accept(visitor); // Output: Visiting ConcreteElementB followed by ConcreteElementB operation
  };
}
