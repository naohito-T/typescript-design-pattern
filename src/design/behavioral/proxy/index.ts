import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { Chalk } from '@/libs/chalk';
import { ILogger } from '@/libs/logger';

interface ProxyAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Proxy extends BaseCommand<ProxyAnswer> implements DesignPatternInfo {
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
          `Proxyの項目から実行するパターンを選んでください。\n`,
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

  protected handler = async (answers: ProxyAnswer): Promise<void> => {
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
// この例では、\`ProxySubject\`は\`RealSubject\`へのアクセスを代理しており、実際の要求の前後でアクセスのチェックやログの記録を行っています。
// Subject Interface
interface Subject {
  request(): void;
}

// RealSubject
class RealSubject implements Subject {
  request(): void {
    console.log('RealSubject: Handling request.');
  }
}

// Proxy
class ProxySubject implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  // Subject interfaceで定義されているrequestを実装
  request(): void {
    // 実行前に処理を挟む。
    if (this.checkAccess()) {
      // Subject interfaceで実装した処理を行う。
      this.realSubject.request();
      // logを残す。
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log('Proxy: Checking access...');
    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Logging the time of request.');
  }
}

// Client code
const realSubject = new RealSubject();
console.log('Client: Executing the client code with a real subject:');
realSubject.request();

const proxy = new ProxySubject(realSubject);
console.log('Client: Executing the client code with a proxy:');
proxy.request();
`;

  public exec = (): void => {
    interface Subject {
      request(): void;
    }

    class RealSubject implements Subject {
      request(): void {
        console.log('RealSubject: Handling request.');
      }
    }

    class ProxySubject implements Subject {
      private realSubject: RealSubject;

      constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;
      }

      request(): void {
        if (this.checkAccess()) {
          this.realSubject.request();
          this.logAccess();
        }
      }

      private checkAccess(): boolean {
        console.log('Proxy: Checking access...');
        return true;
      }

      private logAccess(): void {
        console.log('Proxy: Logging the time of request.');
      }
    }

    const realSubject = new RealSubject();
    console.log('Client: Executing the client code with a real subject:');
    realSubject.request();

    const proxy = new ProxySubject(realSubject);
    console.log('Client: Executing the client code with a proxy:');
    proxy.request();
  };
}
