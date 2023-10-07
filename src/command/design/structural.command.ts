import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { HelpCommand } from '@/command/help';
import { Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy } from '@/design/behavioral';
import { ILogger } from '@/logger';

interface StructuralCommandAnswer extends Answers {
  pattern: 'help' | 'adapter' | 'bridge' | 'composite' | 'decorator' | 'facade' | 'flyweight' | 'proxy';
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
        choices: [
          'help',
          'adapter',
          'bridge',
          'composite',
          'decorator',
          'facade',
          'flyweight',
          'proxy',
        ] as StructuralCommandAnswer['pattern'][],
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
      case 'adapter':
        await new Adapter(this.logger).run();
        break;
      case 'bridge':
        await new Bridge(this.logger).run();
        break;
      case 'composite':
        await new Composite(this.logger).run();
        break;
      case 'decorator':
        await new Decorator(this.logger).run();
        break;
      case 'facade':
        await new Facade(this.logger).run();
        break;
      case 'flyweight':
        await new Flyweight(this.logger).run();
        break;
      case 'proxy':
        await new Proxy(this.logger).run();
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
