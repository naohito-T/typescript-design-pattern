import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/libs/logger';

interface ChainOfResponsibilityAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class ChainOfResponsibility extends BaseCommand<ChainOfResponsibilityAnswer> implements DesignPatternInfo {
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
          `ChainOfResponsibilityの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: ChainOfResponsibilityAnswer): Promise<void> => {
    this.logger.debug(`AbstractFactory answers: ${JSON.stringify(answers)}`);

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
    // この例では、ConcreteHandlerA と ConcreteHandlerB が異なる要求を処理するためのハンドラとして存在します。要求が適切なハンドラに到達するまで、ハンドラの連鎖を通過します。
    abstract class Handler {
      protected nextHandler?: Handler;

      setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
      }

      handle(request: string): void {
        if (this.nextHandler) {
          this.nextHandler.handle(request);
        }
      }
    }

    class ConcreteHandlerA extends Handler {
      handle(request: string): void {
        if (request === 'requestA') {
          console.log('ConcreteHandlerA handling requestA');
        } else if (this.nextHandler) {
          this.nextHandler.handle(request);
        }
      }
    }

    class ConcreteHandlerB extends Handler {
      handle(request: string): void {
        if (request === 'requestB') {
          console.log('ConcreteHandlerB handling requestB');
        } else if (this.nextHandler) {
          this.nextHandler.handle(request);
        }
      }
    }

    // Client code
    const handlerA = new ConcreteHandlerA();
    const handlerB = new ConcreteHandlerB();

    handlerA.setNext(handlerB);

    handlerA.handle('requestA'); // Outputs: ConcreteHandlerA handling requestA
    handlerA.handle('requestB'); // Outputs: ConcreteHandlerB handling requestB
    handlerA.handle('requestC'); // No output, no handler for requestC
  };
}
