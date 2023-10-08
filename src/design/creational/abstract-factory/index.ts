import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface AbstractFactoryAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class AbstractFactory extends BaseCommand<AbstractFactoryAnswer> implements DesignPatternInfo {
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
    const selectedOptions = await this.p(this.question);

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

  public description = () => `
${chalk.bold.bgGreen(`[description]`)}
このパターンは「Virtual Constructor」とも呼ばれ、コンストラクターの代わりになるようなメソッドを作ることがキモなパターンです。
コンストラクターの代わりにインスタンスの工場（Factory）となるメソッド（Method）を作るから「FactoryMethod」パターンなんですね。`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${chalk.bold.bgGreen(`[example code]`)}
`;

  public exec = (): void => {
    // Abstract Products
    interface Button {
      click(): void;
    }

    interface PcWindow {
      open(): void;
    }

    // Concrete Products
    class WindowsButton implements Button {
      click() {
        console.log('Windows Button clicked');
      }
    }

    class MacButton implements Button {
      click() {
        console.log('Mac Button clicked');
      }
    }

    class WindowsWindow implements PcWindow {
      open() {
        console.log('Windows Window opened');
      }
    }

    class MacWindow implements PcWindow {
      open() {
        console.log('Mac Window opened');
      }
    }

    /**
     * @description Abstract Factory
     * @note ここが肝。Factoryクラスの必要なメソッドをまとめる
     * @tips 結局サブクラスごとでメソッドを変えるのであれば継承 or ジェネリクスを使うしかないのかな
     */
    interface GUIFactory {
      createButton(): Button;
      createWindow(): PcWindow;
    }

    /**
     * @description Concrete Factories
     * @note windows用に必要なクラスをセットするクラス
     */
    class WindowsFactory implements GUIFactory {
      createButton(): Button {
        return new WindowsButton();
      }

      createWindow(): PcWindow {
        return new WindowsWindow();
      }
    }

    /**
     * @desc Concrete Factories
     * @note mac用に必要なクラスをセットするクラス
     */
    class MacFactory implements GUIFactory {
      createButton(): Button {
        return new MacButton();
      }

      createWindow(): PcWindow {
        return new MacWindow();
      }
    }

    // Client Code
    const buildGUI = (factory: GUIFactory) => {
      const button = factory.createButton();
      const window = factory.createWindow();

      button.click();
      window.open();
    };

    const factory = Math.random() < 0.5 ? new WindowsFactory() : new MacFactory();
    buildGUI(factory);
  };
}
