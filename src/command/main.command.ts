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
  name: 'large category pattern',
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

  public run = async () => {
    const answers = await prompt(this.question);

    this.logger.debug(`MainCommand answers: ${JSON.stringify(answers)}`);
    this.logger.debug(`Env STAGE: ${BaseEnv.stage}`);
    this.logger.debug(`Env VERSION: ${E.VERSION}`);

    switch (answers.pattern) {
      case 'creational':
        const command = new CreationalCommand(this.logger);
        await command.run();
        break;
      case 'structural':
        break;
      case 'behavioral':
        break;
      case 'help':
        console.log('Help: 以下のデザインパターンから選んでください...');
        break;
      default:
        break;
    }

    // @todo ここでdesignパターンの3つのカテゴリを選ばせる。

    // const program = new Command().version(E.VERSION);

    // function collect(value: string, previous: string[]): string[] {
    //   return [...previous, value];
    // }

    // program
    //   .version('1.0.0')
    //   .description(
    //     `Welcome to Typescript design pattern\nFirst, please tell us about the three major categories in DESIGN PATTERN`,
    //   )
    //   .option('-p, --pizza-type <type>', 'Type of pizza')
    //   .option('-s, --size <size>', 'Size of pizza', 'medium')
    //   .option('-t, --topping <topping>', 'Toppings for pizza', collect, [])
    //   .option('-d, --delivery', 'Deliver the pizza')
    //   .addHelpText('after', '\nExample call:')
    //   .addHelpText('after', '$ example -p pepperoni -t onion -t olive -d')
    //   .parse();

    // const options = program.opts();
    // console.log('Options:', options);
  };
}
