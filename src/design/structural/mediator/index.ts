import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface MediatorAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Mediator extends BaseCommand<MediatorAnswer> implements DesignPatternInfo {
  public readonly question;

  constructor(
    private readonly p: PromptModule,
    private readonly logger: ILogger,
  ) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Mediatorの項目から実行するパターンを選んでください。\n`,
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
    const selectedOptions = await this.p(this.question);

    this.logger.debug(`Iterator answers: ${JSON.stringify(selectedOptions)}`);

    const outputMsg: string[] = [];

    selectedOptions.outputs.forEach((option) => {
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
    // この例では、ConcreteMediatorは2つのConcreteColleagueオブジェクトの通信を管理しています。
    // ColleagueAのアクションが行われると、Mediatorを通じてColleagueBが通知され、逆も同様です。
    // Mediatorインターフェース

    interface Mediator {
      notify(sender: Colleague, event: string): void;
    }

    // Colleagueクラス（Colleague = 同僚）
    abstract class Colleague {
      protected mediator: Mediator;

      constructor(mediator: Mediator) {
        this.mediator = mediator;
      }

      abstract action(): void;
    }

    // 具体的なColleagueクラス
    class ConcreteColleagueA extends Colleague {
      action(): void {
        console.log('ColleagueA is taking action.');
        this.mediator.notify(this, 'ActionA');
      }
    }

    class ConcreteColleagueB extends Colleague {
      action(): void {
        console.log('ColleagueB is taking action.');
        this.mediator.notify(this, 'ActionB');
      }
    }

    // 具体的なMediatorクラス（中央集権）
    class ConcreteMediator implements Mediator {
      private colleagueA: ConcreteColleagueA | null = null;

      private colleagueB: ConcreteColleagueB | null = null;

      setColleagueA(colleague: ConcreteColleagueA) {
        this.colleagueA = colleague;
      }

      setColleagueB(colleague: ConcreteColleagueB) {
        this.colleagueB = colleague;
      }

      notify(sender: Colleague, event: string): void {
        // 片方のeventが行われたら片方も行う。
        if (event === 'ActionA') {
          this.colleagueB?.action();
        } else if (event === 'ActionB') {
          this.colleagueA?.action();
        }
      }
    }

    // 使用例
    const mediator = new ConcreteMediator();
    const colleagueA = new ConcreteColleagueA(mediator);
    const colleagueB = new ConcreteColleagueB(mediator);

    mediator.setColleagueA(colleagueA);
    mediator.setColleagueB(colleagueB);

    colleagueA.action(); // ColleagueAの行動によってColleagueBの行動が引き起こされる
    colleagueB.action(); // ColleagueBの行動によってColleagueAの行動が引き起こされる
  };
}
