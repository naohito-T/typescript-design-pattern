import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/libs/logger';

interface FlyweightAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Flyweight extends BaseCommand<FlyweightAnswer> implements DesignPatternInfo {
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
          `Flyweightの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: FlyweightAnswer): Promise<void> => {
    this.logger.debug(`Composite answers: ${JSON.stringify(answers)}`);

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

  public description = () => `${chalk.bold.bgGreen(`[description]`)}`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${chalk.bold.bgGreen(`[example code]`)}
// Flyweightオブジェクトを定義します。
class TextStyle {
  private readonly color: string;

  private readonly fontSize: number;

  private readonly fontFamily: string;

  constructor(color: string, fontSize: number, fontFamily: string) {
    this.color = color;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
  }

  applyStyle() {
    console.log(\`Applying style: \${this.color}, \${this.fontSize}px, \${this.fontFamily}\`);
  }
}

// Flyweight Factoryを定義します。
class TextStyleFactory {
  private styles: { [key: string]: TextStyle } = {};

  getStyle(color: string, fontSize: number, fontFamily: string): TextStyle {
    // 3つの引数でkeyを作成し、対象の変数を持っていなかったら生成する。
    const key = \`\${color}-\${fontSize}-\${fontFamily}\`;
    if (!this.styles[key]) {
      this.styles[key] = new TextStyle(color, fontSize, fontFamily);
    }
    return this.styles[key];
  }
}

// 使用例
const factory = new TextStyleFactory();

const style1 = factory.getStyle('red', 16, 'Arial');
const style2 = factory.getStyle('blue', 20, 'Times New Roman');
const style3 = factory.getStyle('red', 16, 'Arial');

// 再利用されているか
console.log(style1 === style3); // true
console.log(style1 === style2); // false

style1.applyStyle(); // Applying style: red, 16px, Arial
style2.applyStyle(); // Applying style: blue, 20px, Times New Roman

// 上記の例では、TextStyleはFlyweightオブジェクトで、TextStyleFactoryはFlyweight Factoryとして動作します。TextStyleFactoryは、既に作成されたスタイルを再利用することで、不要なインスタンスの生成を防ぎます。
`;

  public exec = (): void => {
    class TextStyle {
      private readonly color: string;

      private readonly fontSize: number;

      private readonly fontFamily: string;

      constructor(color: string, fontSize: number, fontFamily: string) {
        this.color = color;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
      }

      applyStyle() {
        console.log(`Applying style: ${this.color}, ${this.fontSize}px, ${this.fontFamily}`);
      }
    }

    class TextStyleFactory {
      private styles: { [key: string]: TextStyle } = {};

      getStyle(color: string, fontSize: number, fontFamily: string): TextStyle {
        const key = `${color}-${fontSize}-${fontFamily}`;
        if (!this.styles[key]) {
          this.styles[key] = new TextStyle(color, fontSize, fontFamily);
        }
        return this.styles[key];
      }
    }

    const factory = new TextStyleFactory();

    const style1 = factory.getStyle('red', 16, 'Arial');
    const style2 = factory.getStyle('blue', 20, 'Times New Roman');
    const style3 = factory.getStyle('red', 16, 'Arial');

    console.log(style1 === style3);
    console.log(style1 === style2);

    style1.applyStyle();
    style2.applyStyle();
  };
}
