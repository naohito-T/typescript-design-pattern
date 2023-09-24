import * as chalk from 'chalk';
import { prompt, QuestionAnswer, Question, InputQuestionOptions, QuestionCollection } from 'inquirer';
import { Command } from 'commander';
import { Environment as E } from '@/configs';
import { ILogger, logger as log } from '@/logger';

const main = async (logger: ILogger) => {
  // コマンドの定義
  logger.info(chalk.blue('ようこそ。') + chalk.red('typescript design pattern') + chalk.red('!'));

  /**
   * @desc inquirer を使って対話型のインタフェースを定義していきます。
   */
  const questions: QuestionCollection = [
    {
      type: 'confirm',
      name: 'wantToppings',
      message: 'Do you want toppings?',
      default: false,
    },
    {
      type: 'checkbox',
      name: 'selectedToppings',
      message: 'Select toppings',
      choices: [{ name: 'Pepperoni' }, { name: 'Mushrooms' }, { name: 'Onions' }],
      when: (answers: any) => answers.wantToppings,
    },
  ];

  const answers = await prompt(questions);

  console.log('\nOrder receipt:');
  console.log('--------------------------');
  console.log('Toppings:', answers.selectedToppings || 'No toppings');
  console.log('--------------------------');

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

try {
  main(log);
} catch (e: unknown) {
  console.error(e);
}
