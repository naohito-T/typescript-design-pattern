import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface DecoratorAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Decorator extends BaseCommand<DecoratorAnswer> implements DesignPatternInfo {
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
          `Decoratorの項目から実行するパターンを選んでください。\n`,
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
    const answers = await this.p(this.question);
    await this.handler(answers);
  };

  protected handler = async (answers: DecoratorAnswer): Promise<void> => {
    this.logger.debug(`Composite answers: ${JSON.stringify(answers)}`);

    const outputMsg: string[] = [];

    answers.outputs.forEach((option) => {
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

  public description = () => `${this.c.bold.bgGreen(`[description]`)}`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${this.c.bold.bgGreen(`[example code]`)}
// Component インターフェース: これはデコレートされるオブジェクトの基本インターフェースです。
interface Component {
  operation(): string;
}

// ConcreteComponent: Component インターフェースを実装するクラス。このクラスのインスタンスがデコレートされます。
class ConcreteComponent implements Component {
  operation(): string {
    return 'ConcreteComponent';
  }
}

// Decorator: この抽象クラスは Component インターフェースを実装し、Component のインスタンスを保持します。このクラスは具体的なデコレータの基底クラスとして機能します。
abstract class DecoratorComponent implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  abstract operation(): string;
}

// 具体的なデコレータ: Decorator クラスを拡張して、新しい機能や振る舞いを追加します。
class ConcreteDecoratorA extends DecoratorComponent {
  operation(): string {
    return \`ConcreteDecoratorA(\${this.component.operation()})\`;
  }
}

class ConcreteDecoratorB extends DecoratorComponent {
  operation(): string {
    return \`ConcreteDecoratorB(\${this.component.operation()})\`;
  }
}
const simpleComponent = new ConcreteComponent();
console.log(simpleComponent.operation()); // Output: ConcreteComponent

const decoratedComponentA = new ConcreteDecoratorA(simpleComponent);
console.log(decoratedComponentA.operation()); // Output: ConcreteDecoratorA(ConcreteComponent)

const decoratedComponentB = new ConcreteDecoratorB(decoratedComponentA);
console.log(decoratedComponentB.operation()); // Output: ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))
`;

  public exec = (): void => {
    interface Component {
      operation(): string;
    }

    class ConcreteComponent implements Component {
      operation(): string {
        return 'ConcreteComponent';
      }
    }

    abstract class DecoratorComponent implements Component {
      protected component: Component;

      constructor(component: Component) {
        this.component = component;
      }

      abstract operation(): string;
    }

    class ConcreteDecoratorA extends DecoratorComponent {
      operation(): string {
        return `ConcreteDecoratorA(${this.component.operation()})`;
      }
    }

    class ConcreteDecoratorB extends DecoratorComponent {
      operation(): string {
        return `ConcreteDecoratorB(${this.component.operation()})`;
      }
    }

    const simpleComponent = new ConcreteComponent();
    console.log(simpleComponent.operation());

    const decoratedComponentA = new ConcreteDecoratorA(simpleComponent);
    console.log(decoratedComponentA.operation());

    const decoratedComponentB = new ConcreteDecoratorB(decoratedComponentA);
    console.log(decoratedComponentB.operation());
  };
}
