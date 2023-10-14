import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface ObserverAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Observer extends BaseCommand<ObserverAnswer> implements DesignPatternInfo {
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
          `Observerの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: ObserverAnswer): Promise<void> => {
    this.logger.debug(`Observer answers: ${JSON.stringify(answers)}`);

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
    // この例では、`ConcreteSubject`は状態（メッセージ）の変更を検知すると、その変更を`ConcreteObserver`に自動的に通知します。
    interface Observer {
      update(message: string): void;
    }

    interface Subject {
      attach(observer: Observer): void;
      detach(observer: Observer): void;
      notify(): void;
    }

    class ConcreteSubject implements Subject {
      private observers: Observer[] = [];

      private message: string = '';

      attach(observer: Observer): void {
        this.observers.push(observer);
      }

      detach(observer: Observer): void {
        // 見つからなかったら -1を返す。
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
          // 配列から対象のインデックスを省いた配列を作成する。
          this.observers.splice(index, 1);
        }
      }

      setMessage(message: string): void {
        this.message = message;
        this.notify();
      }

      public notify(): void {
        for (let observer of this.observers) {
          observer.update(this.message);
        }
      }
    }

    class ConcreteObserver implements Observer {
      private name: string;

      constructor(name: string) {
        this.name = name;
      }

      update(message: string): void {
        console.log(`${this.name} received message: ${message}`);
      }
    }

    // 使用例
    const subject = new ConcreteSubject();

    const observer1 = new ConcreteObserver('Observer 1');
    const observer2 = new ConcreteObserver('Observer 2');

    subject.attach(observer1);
    subject.attach(observer2);

    subject.setMessage('Hello, Observers!');
    // Observer 1 received message: Hello, Observers!
    // Observer 2 received message: Hello, Observers!
  };
}
