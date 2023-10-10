import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BehavioralCommand, CreationalCommand, StructuralCommand } from '@/command/design';
import { ILogger } from '@/libs/logger';
import i18n from '@/locales/i18n';
import { BaseCommand } from './_base.command';
import { HelpCommand } from './help';

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
  protected readonly question;

  constructor(
    private readonly p: PromptModule,
    private readonly logger: ILogger,
  ) {
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
    const answers = await this.p(this.question);
    await this.handler(answers);
  };

  protected handler = async (answers: LargeCategoryAnswer): Promise<void> => {
    switch (answers.pattern) {
      case 'creational':
        this.logger.debug(`MainCommand answers: creational`);
        await new CreationalCommand(this.p, this.logger).run();
        break;
      case 'structural':
        this.logger.debug(`MainCommand answers: structural`);
        await new StructuralCommand(this.p, this.logger).run();
        break;
      case 'behavioral':
        this.logger.debug(`MainCommand answers: behavioral`);
        await new BehavioralCommand(this.p, this.logger).run();
        break;
      case 'help':
        console.log('Help: 以下のデザインパターンから選んでください...');
        new HelpCommand(this.logger, 'large', 'abstract-factory').show();
        break;
      default:
        this.logger.debug(`MainCommand answers: default`);
        new HelpCommand(this.logger, 'large', 'abstract-factory').show();
        break;
    }
  };
}
