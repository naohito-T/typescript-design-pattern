import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { ILogger } from '@/logger';
import { BaseCommand } from './_base.command';

interface CreationalAnswer extends Answers {
  pattern: 'help' | 'factory-method' | 'abstract-factory' | 'builder';
}

const defaultQuestion = {
  type: 'list',
  name: 'creational',
  default: 'help',
};

export class CreationalCommand extends BaseCommand<CreationalAnswer> {
  public readonly question;

  constructor(private readonly logger: ILogger) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Creationalの項目から実行するパターンを選んでください。\n`,
        )}`,
        choices: ['help', 'factory-method', 'abstract-factory', 'builder'],
      },
    });
  }

  public run = async () => {
    const answers = await prompt(this.question);

    this.logger.debug(`CreationalCommand answers: ${answers}`);

    switch (answers.pattern) {
      case 'factory-method':
        break;
      case 'abstract-factory':
        break;
      case 'builder':
        break;
      case 'help':
        console.log('Help: 以下のデザインパターンから選んでください...');
        break;
      default:
        break;
    }
  };
}
