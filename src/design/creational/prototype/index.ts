import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface PrototypeAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Prototype extends BaseCommand<PrototypeAnswer> implements DesignPatternInfo {
  public readonly question;

  constructor(private readonly logger: ILogger) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
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
    const selectedOptions = await prompt(this.question);

    this.logger.debug(`Builder answers: ${JSON.stringify(selectedOptions)}`);

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

  /** @description descriptionを出力する */
  public description = () => `
${chalk.bold.bgGreen(`[description]`)}
`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  /** @description example codeを出力する */
  public exampleCode = (): string => `
${chalk.bold.bgGreen(`[example code]`)}
`;

  /** @description example codeを実行する */
  public exec = (): void => {
    // Prototype インターフェース
    interface Prototype {
      clone(): Prototype;
    }

    // ConcretePrototype クラス
    class ConcretePrototype implements Prototype {
      private data: string;

      constructor(data: string) {
        this.data = data;
      }

      setData(data: string): void {
        this.data = data;
      }

      getData(): string {
        return this.data;
      }

      // Prototype インターフェースの実装
      clone(): ConcretePrototype {
        // 新しいオブジェクトのインスタンスを作成し、既存のデータで初期化します。
        return new ConcretePrototype(this.data);
      }
    }

    // 使用例
    const original = new ConcretePrototype('Initial Data');
    console.log(`Original Object's Data: ${original.getData()}`);

    // cloneを作成する
    const cloned = original.clone();
    console.log(`Cloned Object's Data: ${cloned.getData()}`);

    cloned.setData('Changed Data');
    console.log(`Cloned Object's New Data: ${cloned.getData()}`);
    console.log(`Original Object's Data (After Clone Modification): ${original.getData()}`);
  };
}
