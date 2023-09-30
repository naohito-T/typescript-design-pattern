import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { BaseEnv, Environment as E } from '@/configs';
import i18n from '@/locales/i18n';
import { ILogger } from '@/logger';
import { BaseCommand } from './_base.command';
import { BehavioralCommand } from './behavioral.command';
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
        message: `-------------------------------\n  ${chalk.bold.bgBlue(
          `${i18n.t('main.message')}`,
        )}\n  -------------------------------\n\n  以下の項目から実行するdesign patternの大カテゴリを選んでください。\n`,
        choices: ['creational', 'structural', 'behavioral', 'help'] as LargeCategoryAnswer['pattern'][],
      },
    });
  }

  public run = async (): Promise<void> => {
    const answers = await prompt(this.question);
    this.logger.debug(`MainCommand answers: ${JSON.stringify(answers)}`);
    this.logger.debug(`Env STAGE: ${BaseEnv.stage}`);
    this.logger.debug(`Env VERSION: ${E.VERSION}`);
    await this.handler(answers);
  };

  private handler = async (answers: LargeCategoryAnswer): Promise<void> => {
    switch (answers.pattern) {
      case 'creational':
        this.logger.debug(`MainCommand answers: creational`);
        await new CreationalCommand(this.logger).run();
        break;
      case 'structural':
        this.logger.debug(`MainCommand answers: structural`);
        break;
      case 'behavioral':
        this.logger.debug(`MainCommand answers: behavioral`);
        await new BehavioralCommand(this.logger).run();
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
