import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { HelpCommand } from '@/command/help';
import { FactoryMethod, AbstractFactory, Builder, Prototype } from '@/design/creational';
import { ILogger } from '@/libs/logger';

interface CreationalAnswer extends Answers {
  pattern: 'help' | 'factory-method' | 'abstract-factory' | 'builder' | 'prototype';
}

const defaultQuestion = {
  type: 'list',
  name: 'pattern', // keyの設定
  default: 'help',
};

export class CreationalCommand extends BaseCommand<CreationalAnswer> {
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
          `Creationalの項目から実行するパターンを選んでください。\n`,
        )}`,
        choices: [
          'help',
          'factory-method',
          'abstract-factory',
          'builder',
          'prototype',
        ] as CreationalAnswer['pattern'][],
      },
    });
  }

  public run = async (): Promise<void> => {
    const answers = await this.p(this.question);
    this.logger.debug(`CreationalCommand answers: ${answers}`);
    await this.handler(answers);
  };

  protected handler = async (answers: CreationalAnswer): Promise<void> => {
    switch (answers.pattern) {
      case 'factory-method':
        await new FactoryMethod(this.p, this.logger).run();
        break;
      case 'abstract-factory':
        await new AbstractFactory(this.p, this.logger).run();
        break;
      case 'builder':
        await new Builder(this.p, this.logger).run();
        break;
      case 'prototype':
        await new Prototype(this.p, this.logger).run();
        break;
      case 'help':
        new HelpCommand(this.logger, 'large', 'creational').show();
        break;
      default:
        new HelpCommand(this.logger, 'large', 'creational').show();
        break;
    }
  };
}
