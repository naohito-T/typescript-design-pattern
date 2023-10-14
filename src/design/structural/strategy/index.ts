import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface StrategyAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Strategy extends BaseCommand<StrategyAnswer> implements DesignPatternInfo {
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
          `Strategyの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: StrategyAnswer): Promise<void> => {
    this.logger.debug(`Strategy answers: ${JSON.stringify(answers)}`);

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
    // この例では、支払い方法としての異なる戦略（クレジットカードやPayPalなど）をカプセル化し、クライアントから独立してこれらの戦略を交換できるようにしています。
    // Strategyインターフェース
    interface PaymentStrategy {
      pay(amount: number): void;
    }

    // ConcreteStrategy1
    class CreditCardPayment implements PaymentStrategy {
      pay(amount: number) {
        console.log(`Paid ${amount} using Credit Card`);
      }
    }

    // ConcreteStrategy2
    class PayPalPayment implements PaymentStrategy {
      pay(amount: number) {
        console.log(`Paid ${amount} using PayPal`);
      }
    }

    // Context（支払い方法をセットするクラス）
    class PaymentContext {
      private strategy: PaymentStrategy;

      constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
      }

      executePayment(amount: number) {
        this.strategy.pay(amount);
      }

      setStrategy(strategy: PaymentStrategy) {
        this.strategy = strategy;
      }
    }

    // 実行
    const context = new PaymentContext(new CreditCardPayment());
    context.executePayment(100); // Outputs: Paid 100 using Credit Card

    context.setStrategy(new PayPalPayment());
    context.executePayment(200); // Outputs: Paid 200 using PayPal
  };
}
