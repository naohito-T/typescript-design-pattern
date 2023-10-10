import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/libs/logger';

interface StateAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class State extends BaseCommand<StateAnswer> implements DesignPatternInfo {
  protected readonly question;

  constructor(
    private readonly p: PromptModule,
    private readonly logger: ILogger,
  ) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Stateの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: StateAnswer): Promise<void> => {
    this.logger.debug(`State answers: ${JSON.stringify(answers)}`);

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
${chalk.bold.bgGreen(`[description]`)}
`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${chalk.bold.bgGreen(`[example code]`)}
`;

  public exec = (): void => {
    // この例では、Context クラスの request メソッドが呼び出されるたびに、現在の状態（State インターフェースを実装したクラス）の handle メソッドが実行され、状態が切り替わります。

    interface State {
      handle(): void;
    }

    // 各state（状態）通しは依存しないようにする。
    class ConcreteStateA implements State {
      handle(): void {
        console.log('Handling in State A');
      }
    }

    // 各state（状態）通しは依存しないようにする。
    class ConcreteStateB implements State {
      handle(): void {
        console.log('Handling in State B');
      }
    }

    // 状態間の遷移を行うクラス
    class Context {
      private state: State;

      constructor() {
        this.state = new ConcreteStateA();
      }

      setState(state: State): void {
        this.state = state;
      }

      request(): void {
        this.state.handle();
        // 状態遷移のロジックをここに
        if (this.state instanceof ConcreteStateA) {
          this.setState(new ConcreteStateB());
        } else {
          this.setState(new ConcreteStateA());
        }
      }
    }

    // 使用例
    const context = new Context();
    context.request(); // Output: Handling in State A
    context.request(); // Output: Handling in State B
  };
}
