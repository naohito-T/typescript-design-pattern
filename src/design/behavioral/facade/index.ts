import * as chalk from 'chalk';
import { PromptModule, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { DesignPatternInfo } from '@/design/design.interface';
import { ILogger } from '@/logger';

interface FacadeAnswer extends Answers {
  outputs: ('help' | 'exec' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

export class Facade extends BaseCommand<FacadeAnswer> implements DesignPatternInfo {
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
          `Facadeの項目から実行するパターンを選んでください。\n`,
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

    this.logger.debug(`Composite answers: ${JSON.stringify(selectedOptions)}`);

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

  public description = () => `${chalk.bold.bgGreen(`[description]`)}`;

  /** @wip */
  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${chalk.bold.bgGreen(`[example code]`)}
// 複雑なサブシステムのクラス群
class Amplifier {
  on() {
    console.log('Amplifier is turned on');
  }

  off() {
    console.log('Amplifier is turned off');
  }
}

class Tuner {
  setStation(station: string) {
    console.log(\`Tuner is set to station \${station}\`);
  }
}

class CDPlayer {
  play(cd: string) {
    console.log(\`CDPlayer is playing \${cd}\`);
  }
}

class Speakers {
  setVolume(volume: number) {
    console.log(\`Speakers volume is set to \${volume}\`);
  }
}

// Facadeクラス
class MusicSystemFacade {
  private amp: Amplifier;

  private tuner: Tuner;

  private cdPlayer: CDPlayer;

  private speakers: Speakers;

  constructor() {
    this.amp = new Amplifier();
    this.tuner = new Tuner();
    this.cdPlayer = new CDPlayer();
    this.speakers = new Speakers();
  }

  listenToRadio(station: string) {
    this.amp.on();
    this.tuner.setStation(station);
    this.speakers.setVolume(5);
  }

  listenToCD(cd: string) {
    this.amp.on();
    this.cdPlayer.play(cd);
    this.speakers.setVolume(5);
  }

  turnOff() {
    this.amp.off();
  }
}

/**
 * @description このコードはサブシステムをwrapしたクラスを用意して
 * 各コンポーネントを簡単に操作する方法を示している。
 * クライアントはFacadeクラスのメソッドを使用し、サブシステムの複雑さを気にせず、システムを操作できる。
 */
const musicSystem = new MusicSystemFacade();
musicSystem.listenToRadio('80.4 FM');
musicSystem.turnOff();
musicSystem.listenToCD('Beatles');
musicSystem.turnOff();
`;

  public exec = (): void => {
    class Amplifier {
      on() {
        console.log('Amplifier is turned on');
      }

      off() {
        console.log('Amplifier is turned off');
      }
    }

    class Tuner {
      setStation(station: string) {
        console.log(`Tuner is set to station ${station}`);
      }
    }

    class CDPlayer {
      play(cd: string) {
        console.log(`CDPlayer is playing ${cd}`);
      }
    }

    class Speakers {
      setVolume(volume: number) {
        console.log(`Speakers volume is set to ${volume}`);
      }
    }

    class MusicSystemFacade {
      private amp: Amplifier;

      private tuner: Tuner;

      private cdPlayer: CDPlayer;

      private speakers: Speakers;

      constructor() {
        this.amp = new Amplifier();
        this.tuner = new Tuner();
        this.cdPlayer = new CDPlayer();
        this.speakers = new Speakers();
      }

      listenToRadio(station: string) {
        this.amp.on();
        this.tuner.setStation(station);
        this.speakers.setVolume(5);
      }

      listenToCD(cd: string) {
        this.amp.on();
        this.cdPlayer.play(cd);
        this.speakers.setVolume(5);
      }

      turnOff() {
        this.amp.off();
      }
    }

    const musicSystem = new MusicSystemFacade();
    musicSystem.listenToRadio('80.4 FM');
    musicSystem.turnOff();
    musicSystem.listenToCD('Beatles');
    musicSystem.turnOff();
  };
}
