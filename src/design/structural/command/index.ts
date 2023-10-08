import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface CommandAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Command extends BaseCommand<CommandAnswer> implements DesignPatternInfo {
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
          `Commandの項目から実行するパターンを選んでください。\n`,
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

    this.logger.debug(`Command answers: ${JSON.stringify(selectedOptions)}`);

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
// この実装例では、\`Light\`クラスがReceiverとして機能し、\`TurnOnLightCommand\`および\`TurnOffLightCommand\`が具体的なコマンドとして機能します。
// \`RemoteControl\`クラスはInvokerとして機能します。

// コマンドインターフェース
interface Command {
  execute(): void;
}

// Receiver（操作を実行するクラス）
class Light {
  turnOn() {
    console.log('Light is ON');
  }

  turnOff() {
    console.log('Light is OFF');
  }
}

// 具体的なコマンド
class TurnOnLightCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}

class TurnOffLightCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }
}

// Invoker（操作を要求するクラス）
class RemoteControl {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }
}

// 左に移動するコマンド
const light = new Light();
// 左に進むコマンド
const turnOn = new TurnOnLightCommand(light);
// 左から戻るコマンド
const turnOff = new TurnOffLightCommand(light);

// 操作を実行する
const remote = new RemoteControl(turnOn);
remote.pressButton()

// 操作を実行する
const remote2 = new RemoteControl(turnOff);
remote2.pressButton();
`;

  public exec = (): void => {
    interface Command {
      execute(): void;
    }

    class Light {
      turnOn() {
        console.log('Light is ON');
      }

      turnOff() {
        console.log('Light is OFF');
      }
    }

    class TurnOnLightCommand implements Command {
      private light: Light;

      constructor(light: Light) {
        this.light = light;
      }

      execute() {
        this.light.turnOn();
      }
    }

    class TurnOffLightCommand implements Command {
      private light: Light;

      constructor(light: Light) {
        this.light = light;
      }

      execute() {
        this.light.turnOff();
      }
    }

    class RemoteControl {
      private command: Command;

      constructor(command: Command) {
        this.command = command;
      }

      pressButton() {
        this.command.execute();
      }
    }

    const light = new Light();
    const turnOn = new TurnOnLightCommand(light);
    const turnOff = new TurnOffLightCommand(light);
    const remote = new RemoteControl(turnOn);
    remote.pressButton();
    const remote2 = new RemoteControl(turnOff);
    remote2.pressButton();
  };
}