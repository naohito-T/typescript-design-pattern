import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface IteratorAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Iterator extends BaseCommand<IteratorAnswer> implements DesignPatternInfo {
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
          `Iteratorの項目から実行するパターンを選んでください。\n`,
        )}`,
        choices: [
          { name: 'help' },
          { name: 'exec' },
          { name: 'description' },
          { name: 'flow-chart' },
          { name: 'example-code' },
        ],
      },
    });
  }

  public run = async (): Promise<void> => {
    const selectedOptions = await this.p(this.question);

    this.logger.debug(`Iterator answers: ${JSON.stringify(selectedOptions)}`);

    const outputMsg: string[] = [];

    selectedOptions.outputs.forEach((option) => {
      if (option === 'help') {
        console.log('helpが選択されました');
        return; // 脱出するように
      } else if (option === 'exec') {
        console.log('execが選択されました');
        this.exec();
        return; // 脱出するように
      } else if (option === 'description') {
        outputMsg.push(this.description());
      } else if (option === 'flow-chart') {
        outputMsg.push(this.flowChart());
      } else if (option === 'example-code') {
        outputMsg.push(this.exampleCode());
      }
    });

    outputMsg.forEach((msg) => console.log(msg));
  };

  public description = () => `
${chalk.bold.bgGreen(`[description]`)}
`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${chalk.bold.bgGreen(`[example code]`)}

`;

  public exec = (): void => {
    // この例では、`ConcreteAggregate`というコレクションと、そのコレクションを走査するための`ConcreteIterator`を実装しています。イテレータを使用することで、コレクションの内部構造を知らない状態で要素にアクセスできます。

    interface Iterator<T> {
      hasNext(): boolean;
      next(): T;
    }

    interface Aggregate<T> {
      createIterator(): Iterator<T>;
    }

    class ConcreteIterator implements Iterator<number> {
      private aggregate: ConcreteAggregate;

      private index: number = 0;

      constructor(aggregate: ConcreteAggregate) {
        this.aggregate = aggregate;
      }

      hasNext(): boolean {
        return this.index < this.aggregate.length;
      }

      next(): number {
        const result = this.aggregate.getItem(this.index);
        this.index++;
        return result;
      }
    }

    class ConcreteAggregate implements Aggregate<number> {
      private items: number[] = [];

      addItem(item: number) {
        this.items.push(item);
      }

      createIterator(): Iterator<number> {
        return new ConcreteIterator(this);
      }

      getItem(index: number): number {
        return this.items[index];
      }

      get length(): number {
        return this.items.length;
      }
    }

    const aggregate = new ConcreteAggregate();
    aggregate.addItem(1);
    aggregate.addItem(2);
    aggregate.addItem(3);
    aggregate.addItem(4);

    const iterator = aggregate.createIterator();
    while (iterator.hasNext()) {
      console.log(iterator.next());
    }
  };
}
