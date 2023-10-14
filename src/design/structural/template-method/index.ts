import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface TemplateMethodAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class TemplateMethod extends BaseCommand<TemplateMethodAnswer> implements DesignPatternInfo {
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
          `TemplateMethodの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: TemplateMethodAnswer): Promise<void> => {
    this.logger.debug(`TemplateMethod answers: ${JSON.stringify(answers)}`);

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
    // この例では、`BeverageTemplate`がアルゴリズムの骨格（テンプレート）を定義しています。具体的なステップ（`brew`や`addCondiments`）はサブクラスである`Coffee`と`Tea`で実装されます。

    // Abstract class
    abstract class BeverageTemplate {
      // This is the template method we are discussing.
      finalProcedure(): void {
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
      }

      // These methods are common and should be at one place.
      boilWater() {
        console.log('Boiling water');
      }

      pourInCup() {
        console.log('Pouring into cup');
      }

      // These methods are abstract and will be implemented by subclasses.
      abstract brew(): void;
      abstract addCondiments(): void;
    }

    class Coffee extends BeverageTemplate {
      brew() {
        console.log('Brewing Coffee');
      }

      addCondiments() {
        console.log('Adding sugar and milk');
      }
    }

    class Tea extends BeverageTemplate {
      brew() {
        console.log('Brewing Tea');
      }

      addCondiments() {
        console.log('Adding lemon');
      }
    }

    // 実行
    const coffee = new Coffee();
    coffee.finalProcedure(); // Follows the steps and makes coffee

    const tea = new Tea();
    tea.finalProcedure(); // Follows the steps and makes tea
  };
}
