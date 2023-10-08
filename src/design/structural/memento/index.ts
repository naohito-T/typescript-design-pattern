import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface MementoAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Memento extends BaseCommand<MementoAnswer> implements DesignPatternInfo {
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
          `Mementoの項目から実行するパターンを選んでください。\n`,
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

    this.logger.debug(`Memento answers: ${JSON.stringify(selectedOptions)}`);

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
    // この例では、Originatorクラスは現在の状態をMementoオブジェクトに保存し、後でその状態に戻すことができます。
    // Caretakerクラスは、`Memento`オブジェクトを保存しておくためのものです。

    // Mementoクラス（状態を持っておくクラスを作成する）
    class MementoA {
      constructor(private state: string) {}

      getState(): string {
        return this.state;
      }
    }

    // Originatorクラス（Mementoパターンの中で中心的な役割を果たすクラス。）
    class Originator {
      private state: string | null = null;

      setState(state: string): void {
        this.state = state;
      }

      saveToMemento(): MementoA {
        if (!this.state) throw new Error('Not found state');
        return new MementoA(this.state);
      }

      restoreFromMemento(memento: MementoA): void {
        this.state = memento.getState();
      }
    }

    // Caretakerクラス（英語で管理人を意味する単語）
    // Caretakerクラスの主な役割は以下のとおりです：
    // Mementoの保存: Originatorから取得したMementoオブジェクトを保持・管理します。
    // Mementoの取得: 保存された状態を復元する必要があるときに、特定のMementoオブジェクトを取得します。
    // Caretakerは、Mementoオブジェクトのリストやスタックを保持することで、複数の状態を順番に保存・取得できるようにすることが一般的です。
    class Caretaker {
      private mementos: MementoA[] = [];

      addMemento(memento: MementoA): void {
        this.mementos.push(memento);
      }

      getMemento(index: number): MementoA {
        return this.mementos[index];
      }
    }

    // 使用例
    const originator = new Originator();
    const caretaker = new Caretaker();

    originator.setState('State1');
    caretaker.addMemento(originator.saveToMemento());

    originator.setState('State2');
    caretaker.addMemento(originator.saveToMemento());

    // 状態を復元
    const restoreValue = originator.restoreFromMemento(caretaker.getMemento(0));
    console.log(restoreValue); // State1
  };
}
