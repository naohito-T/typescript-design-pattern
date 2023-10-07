import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface BridgeAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Bridge extends BaseCommand<BridgeAnswer> implements DesignPatternInfo {
  public readonly question;

  constructor(private readonly logger: ILogger) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Bridgeの項目から実行するパターンを選んでください。\n`,
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

    this.logger.debug(`Bridge answers: ${JSON.stringify(selectedOptions)}`);

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
// 抽象の部分（Bridgeを形成する）
interface DrawAPI {
  drawCircle(radius: number, x: number, y: number): void;
}

// 具体的な実装部分（赤い丸を作成する）
class RedCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
    console.log(\`Drawing Circle[ color: red, radius: \${radius}, x: \${x}, y: \${y} ]\`);
  }
}

// 具体的な実装部分（緑の丸を作成する）
class GreenCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
    console.log(\`Drawing Circle[ color: green, radius: \${radius}, x: \${x}, y: \${y} ]\`);
  }
}

// 抽象のブリッジ部分（Bridgeを利用する抽象）
abstract class Shape {
  protected drawAPI: DrawAPI;

  constructor(drawAPI: DrawAPI) {
    this.drawAPI = drawAPI;
  }

  abstract draw(): void;
}

// 具体的な抽象部分
class Circle extends Shape {
  private x: number;

  private y: number;

  private radius: number;

  constructor(x: number, y: number, radius: number, drawAPI: DrawAPI) {
    super(drawAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(): void {
    this.drawAPI.drawCircle(this.radius, this.x, this.y);
  }
}

// 使用例
const redCircle = new Circle(100, 100, 10, new RedCircle());
redCircle.draw();

const greenCircle = new Circle(100, 100, 10, new GreenCircle());
greenCircle.draw();
`;

  public exec = (): void => {
    interface DrawAPI {
      drawCircle(radius: number, x: number, y: number): void;
    }

    class RedCircle implements DrawAPI {
      drawCircle(radius: number, x: number, y: number): void {
        console.log(`Drawing Circle[ color: red, radius: ${radius}, x: ${x}, y: ${y} ]`);
      }
    }

    class GreenCircle implements DrawAPI {
      drawCircle(radius: number, x: number, y: number): void {
        console.log(`Drawing Circle[ color: green, radius: ${radius}, x: ${x}, y: ${y} ]`);
      }
    }

    abstract class Shape {
      protected drawAPI: DrawAPI;

      constructor(drawAPI: DrawAPI) {
        this.drawAPI = drawAPI;
      }

      abstract draw(): void;
    }

    class Circle extends Shape {
      private x: number;

      private y: number;

      private radius: number;

      constructor(x: number, y: number, radius: number, drawAPI: DrawAPI) {
        super(drawAPI);
        this.x = x;
        this.y = y;
        this.radius = radius;
      }

      draw(): void {
        this.drawAPI.drawCircle(this.radius, this.x, this.y);
      }
    }

    const redCircle = new Circle(100, 100, 10, new RedCircle());
    redCircle.draw();

    const greenCircle = new Circle(100, 100, 10, new GreenCircle());
    greenCircle.draw();
  };
}
