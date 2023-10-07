import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { Adapter, Bridge, Composite } from '@/design/behavioral';
import { ILogger } from '@/logger';
import { BaseCommand } from './_base.command';
import { HelpCommand } from './help.command';

interface BehavioralCommandAnswer extends Answers {
  pattern: 'help' | 'adapter' | 'bridge' | 'composite' | 'prototype';
}

const defaultQuestion = {
  type: 'list',
  name: 'pattern', // keyの設定
  default: 'help',
};

export class BehavioralCommand extends BaseCommand<BehavioralCommandAnswer> {
  public readonly question;

  constructor(private readonly logger: ILogger) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Behavioral（ビヘイビア）の項目から実行するパターンを選んでください。\n`,
        )}`,
        choices: ['help', 'adapter', 'bridge', 'composite', 'prototype'] as BehavioralCommandAnswer['pattern'][],
      },
    });
  }

  public run = async (): Promise<void> => {
    const answers = await prompt(this.question);
    this.logger.debug(`BehavioralCommand answers: ${answers}`);
    await this.handler(answers);
  };

  private handler = async (answers: BehavioralCommandAnswer): Promise<void> => {
    switch (answers.pattern) {
      case 'adapter':
        await new Adapter(this.logger).run();
        break;
      case 'bridge':
        await new Bridge(this.logger).run();
        break;
      case 'composite':
        await new Composite(this.logger).run();
        break;
      case 'prototype':
        break;
      case 'help':
        new HelpCommand(this.logger, 'large', 'behavioral').show();
        break;
      default:
        new HelpCommand(this.logger, 'large', 'behavioral').show();
        break;
    }
  };
}
