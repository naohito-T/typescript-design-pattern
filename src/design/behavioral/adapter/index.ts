import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface AdapterAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Adapter extends BaseCommand<AdapterAnswer> implements DesignPatternInfo {
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

    this.logger.debug(`AbstractFactory answers: ${JSON.stringify(selectedOptions)}`);

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

  public description = () => `${chalk.bold.bgGreen(`[description]`)}`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${chalk.bold.bgGreen(`[example code]`)}
// 既存クラスで改良を加えにくいパターンがあるとする
class OldPrinter {
  printOld(msg: string): void {
    console.log(\`Printing using old method: \${msg}\`);
  }
}

// 新しく実装したいやつ。そのためインターフェースを作成する
interface NewPrinterInterface {
  print(msg: string): void;
}

// Adapterクラス（中間層を用意する）
class PrinterAdapter implements NewPrinterInterface {
  private oldPrinter: OldPrinter;

  constructor(oldPrinter: OldPrinter) {
    this.oldPrinter = oldPrinter;
  }

  // ここで新しく実装するメソッドとして定義し、旧メソッドを実行する
  print(msg: string): void {
    this.oldPrinter.printOld(msg);
  }
}

// 使用例
const oldPrinter = new OldPrinter();
const adaptedPrinter = new PrinterAdapter(oldPrinter);
adaptedPrinter.print('Hello, World!'); // Output: Printing using old method: Hello, World!
`;

  public exec = (): void => {
    class OldPrinter {
      printOld(msg: string): void {
        console.log(`Printing using old method: ${msg}`);
      }
    }

    interface NewPrinterInterface {
      print(msg: string): void;
    }

    class PrinterAdapter implements NewPrinterInterface {
      private oldPrinter: OldPrinter;

      constructor(oldPrinter: OldPrinter) {
        this.oldPrinter = oldPrinter;
      }

      print(msg: string): void {
        this.oldPrinter.printOld(msg);
      }
    }

    const oldPrinter = new OldPrinter();
    const adaptedPrinter = new PrinterAdapter(oldPrinter);

    adaptedPrinter.print('Hello, World!');
  };
}
