import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { HelpCommand } from '@/command/help';
import {
  ChainOfResponsibility,
  Command,
  Interpreter,
  Iterator,
  Mediator,
  Memento,
  Observer,
  State,
} from '@/design/structural';
import { ILogger } from '@/libs/logger';

interface StructuralCommandAnswer extends Answers {
  pattern:
    | 'help'
    | 'chain-of-responsibility'
    | 'command'
    | 'interpreter'
    | 'iterator'
    | 'mediator'
    | 'memento'
    | 'observer'
    | 'state';
}

const defaultQuestion = {
  type: 'list',
  name: 'pattern', // keyの設定
  default: 'help',
};

export class StructuralCommand extends BaseCommand<StructuralCommandAnswer> {
  public readonly question;

  constructor(
    private readonly p: PromptModule,
    private readonly logger: ILogger,
  ) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Structural（ストラクチャー）の項目から実行するパターンを選んでください。\n`,
        )}`,
        choices: [
          'help',
          'chain-of-responsibility',
          'command',
          'interpreter',
          'iterator',
          'mediator',
          'memento',
          'observer',
          'state',
        ] as StructuralCommandAnswer['pattern'][],
      },
    });
  }

  public run = async (): Promise<void> => {
    const answers = await this.p(this.question);
    this.logger.debug(`BehavioralCommand answers: ${answers}`);
    await this.handler(answers);
  };

  protected handler = async (answers: StructuralCommandAnswer): Promise<void> => {
    switch (answers.pattern) {
      case 'chain-of-responsibility':
        await new ChainOfResponsibility(this.p, this.logger).run();
        break;
      case 'command':
        await new Command(this.p, this.logger).run();
        break;
      case 'interpreter':
        await new Interpreter(this.p, this.logger).run();
        break;
      case 'iterator':
        await new Iterator(this.p, this.logger).run();
        break;
      case 'mediator':
        await new Mediator(this.p, this.logger).run();
        break;
      case 'memento':
        await new Memento(this.p, this.logger).run();
        break;
      case 'observer':
        await new Observer(this.p, this.logger).run();
        break;
      case 'state':
        await new State(this.p, this.logger).run();
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
