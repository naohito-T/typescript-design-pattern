import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/libs/logger';

interface InterpreterAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Interpreter extends BaseCommand<InterpreterAnswer> implements DesignPatternInfo {
  protected readonly question;

  constructor(
    private readonly p: PromptModule,
    private readonly logger: ILogger,
  ) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Interpreterの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: InterpreterAnswer): Promise<void> => {
    this.logger.debug(`Interpreter answers: ${JSON.stringify(answers)}`);

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
    // この例では、簡単な算術表現を解釈するインタープリターを示します。
    // この実装例では、数字は終端式（TerminalExpression）として表現され、加算は非終端式（AddExpression）として表現されます。上記のコードは 5 + 7 を評価して 12 を出力します。

    interface Expression {
      interpret(context: Map<string, number>): number;
    }

    // 終端クラス（計算結果）
    class TerminalExpression implements Expression {
      private number: number;

      constructor(number: number) {
        this.number = number;
      }

      interpret(): number {
        return this.number;
      }
    }
    // 式を実行する
    class AddExpression implements Expression {
      private left: Expression;

      private right: Expression;

      constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
      }

      interpret(context: Map<string, number>): number {
        return this.left.interpret(context) + this.right.interpret(context);
      }
    }

    class VariableExpression implements Expression {
      private varName: string;

      constructor(varName: string) {
        this.varName = varName;
      }

      interpret(context: Map<string, number>): number {
        return context.get(this.varName) || 0;
      }
    }

    // 例: x + 7 の評価、x = 5
    const context = new Map<string, number>();
    context.set('x', 5);
    const x = new VariableExpression('x');
    const seven = new TerminalExpression(7);
    const sum = new AddExpression(x, seven);
    console.log(sum.interpret(context)); // 12
  };
}
