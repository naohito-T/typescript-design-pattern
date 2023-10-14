import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { HelpCommand } from '@/command/help';
import { Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy } from '@/design/behavioral';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface BehavioralCommandAnswer extends Answers {
  pattern: 'help' | 'adapter' | 'bridge' | 'composite' | 'decorator' | 'facade' | 'flyweight' | 'proxy';
}

const defaultQuestion = {
  type: 'list',
  name: 'pattern', // keyの設定
  default: 'help',
};

export class BehavioralCommand extends BaseCommand<BehavioralCommandAnswer> {
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
          `Behavioral（ビヘイビア）の項目から実行するパターンを選んでください。\n`,
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
        ] as BehavioralCommandAnswer['pattern'][],
      },
    });
  }

  public run = async (): Promise<void> => {
    const answers = await this.p(this.question);
    this.logger.debug(`BehavioralCommand answers: ${answers}`);
    await this.handler(answers);
  };

  protected handler = async (answers: BehavioralCommandAnswer): Promise<void> => {
    switch (answers.pattern) {
      case 'adapter':
        await new Adapter(this.p, this.c, this.logger).run();
        break;
      case 'bridge':
        await new Bridge(this.p, this.c, this.logger).run();
        break;
      case 'composite':
        await new Composite(this.p, this.c, this.logger).run();
        break;
      case 'decorator':
        await new Decorator(this.p, this.c, this.logger).run();
        break;
      case 'facade':
        await new Facade(this.p, this.c, this.logger).run();
        break;
      case 'flyweight':
        await new Flyweight(this.p, this.c, this.logger).run();
        break;
      case 'proxy':
        await new Proxy(this.p, this.c, this.logger).run();
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
