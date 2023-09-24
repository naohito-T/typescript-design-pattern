import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { BaseEnv, Environment as E } from '@/configs';
import { ILogger } from '@/logger';
import { BaseCommand } from './_base.command';
import { CreationalCommand } from './creational.command';

interface LargeCategoryAnswer extends Answers {
  pattern: 'help' | 'creational' | 'structural' | 'behavioral';
}

const defaultQuestion = {
  type: 'list',
  name: 'pattern',
  default: 'help',
};

/** @description entrypoint */
export class MainCommand extends BaseCommand<LargeCategoryAnswer> {
  public readonly question;

  constructor(private readonly logger: ILogger) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue('ようこそ ')}${chalk.bold.bgBlue(
          'typescript design patternへ',
        )}\n  -------------------------------\n\n  以下の項目から実行するdesign patternの大カテゴリを選んでください。\n`,
        choices: ['creational', 'structural', 'behavioral', 'help'],
      },
    });
  }

  public run = async (): Promise<void> => {
    const answers = await prompt(this.question);

    this.logger.debug(`MainCommand answers: ${JSON.stringify(answers)}`);
    this.logger.debug(`Env STAGE: ${BaseEnv.stage}`);
    this.logger.debug(`Env VERSION: ${E.VERSION}`);

    switch (answers.pattern) {
      case 'creational':
        this.logger.debug(`MainCommand answers: creational`);
        const command = new CreationalCommand(this.logger);
        await command.run();
        break;
      case 'structural':
        this.logger.debug(`MainCommand answers: structural`);
        break;
      case 'behavioral':
        this.logger.debug(`MainCommand answers: behavioral`);
        break;
      case 'help':
        console.log('Help: 以下のデザインパターンから選んでください...');
        break;
      default:
        this.logger.debug(`MainCommand answers: default`);
        break;
    }
  };
}
