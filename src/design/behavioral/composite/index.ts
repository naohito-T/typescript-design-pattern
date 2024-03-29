import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface CompositeAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Composite extends BaseCommand<CompositeAnswer> implements DesignPatternInfo {
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
          `Compositeの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: CompositeAnswer): Promise<void> => {
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

  public description = () => `${this.c.bold.bgGreen(`[description]`)}`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${this.c.bold.bgGreen(`[example code]`)}
// 抽象コンポーネント
interface Component {
  operation(): void;
}

// 葉コンポーネント
class Leaf implements Component {
  operation(): void {
    console.log('Leaf operation.');
  }
}

// 複合コンポーネント
class CompositeComponent implements Component {
  private children: Component[] = [];

  add(component: Component): void {
    this.children.push(component);
  }

  operation(): void {
    console.log('Composite operation.');
    for (const child of this.children) {
      child.operation();
    }
  }
}

// 使用例
const leaf1 = new Leaf();
const leaf2 = new Leaf();

const composite = new CompositeComponent();
// ここで葉を加える
composite.add(leaf1);
composite.add(leaf2);

// クライアントがLeafとCompositeを同じインターフェースを通じて扱う
// 単独で使ってもいいし
leaf1.operation();
// 複合のオブジェクトを使う
composite.operation();
`;

  public exec = (): void => {
    interface Component {
      operation(): void;
    }

    class Leaf implements Component {
      operation(): void {
        console.log('Leaf operation.');
      }
    }

    class CompositeComponent implements Component {
      private children: Component[] = [];

      add(component: Component): void {
        this.children.push(component);
      }

      operation(): void {
        console.log('Composite operation.');
        for (const child of this.children) {
          child.operation();
        }
      }
    }

    const leaf1 = new Leaf();
    const leaf2 = new Leaf();

    const composite = new CompositeComponent();
    composite.add(leaf1);
    composite.add(leaf2);

    leaf1.operation();
    composite.operation();
  };
}
