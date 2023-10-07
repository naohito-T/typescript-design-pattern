import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { HelpCommand } from '@/command/help';
import { ChainOfResponsibility } from '@/design/structural';
import { ILogger } from '@/logger';

interface StructuralCommandAnswer extends Answers {
  pattern: 'help' | 'chain-of-responsibility';
}

const defaultQuestion = {
  type: 'list',
  name: 'pattern', // keyの設定
  default: 'help',
};

export class StructuralCommand extends BaseCommand<StructuralCommandAnswer> {
  public readonly question;

  constructor(private readonly logger: ILogger) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Structural（ストラクチャー）の項目から実行するパターンを選んでください。\n`,
        )}`,
        choices: ['help', 'chain-of-responsibility'] as StructuralCommandAnswer['pattern'][],
      },
    });
  }

  public run = async (): Promise<void> => {
    const answers = await prompt(this.question);
    this.logger.debug(`BehavioralCommand answers: ${answers}`);
    await this.handler(answers);
  };

  private handler = async (answers: StructuralCommandAnswer): Promise<void> => {
    switch (answers.pattern) {
      case 'chain-of-responsibility':
        await new ChainOfResponsibility(this.logger).run();
        break;
      case 'help':
        new HelpCommand(this.logger, 'large', 'structural').show();
        break;
      default:
        new HelpCommand(this.logger, 'large', 'structural').show();
        break;
    }
  };
}
