import * as chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { BaseCommand } from '@/command/_base.command';
import { ILogger } from '@/logger';

interface FactoryMethodAnswer extends Answers {
  outputs: ('help' | 'description' | 'flow-chart' | 'example-code')[];
}

const defaultQuestion = {
  type: 'checkbox',
  name: 'outputs', // keyの設定
  default: 'help',
};

// 複数選べるように
interface DesignPatternInfo {
  // 説明
  description: () => string;
  // 実行例のフローチャート
  flowChart: () => string;
  // 実行例
  exampleCode: () => string;
}

export class FactoryMethod extends BaseCommand<FactoryMethodAnswer> implements DesignPatternInfo {
  public readonly question;

  constructor(private readonly logger: ILogger) {
    super();
    this.question = this.buildQuestion({
      ...defaultQuestion,
      ...{
        message: `-------------------------------\n  ${chalk.bold.blue(
          `Creationalの項目から実行するパターンを選んでください。\n`,
        )}`,
        choices: [{ name: 'help' }, { name: 'description' }, { name: 'flow-chart' }, { name: 'example-code' }],
      },
    });
  }

  public run = async (): Promise<void> => {
    const selectedOptions = await prompt(this.question);

    this.logger.debug(`FactoryMethod answers: ${JSON.stringify(selectedOptions)}`);

    const outputMsg: string[] = [];

    selectedOptions.outputs.forEach((option) => {
      if (option === 'help') {
        console.log('helpが選択されました');
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

  // interfaceの場合はpublicで実装しないといけないため
  // privateにするテクニックを記事にしてもいいかも
  public description = () => `
${chalk.bold.bgGreen(`[description]`)}
このパターンは「Virtual Constructor」とも呼ばれ、コンストラクターの代わりになるようなメソッドを作ることがキモなパターンです。
コンストラクターの代わりにインスタンスの工場（Factory）となるメソッド（Method）を作るから「FactoryMethod」パターンなんですね。`;

  public flowChart = () => {
    return ``;
  };

  public exampleCode = (): string => `
${chalk.bold.bgGreen(`[example code]`)}
/**
 * @desc Robotインターフェース（Product）
 * @note 高レベルのクラス（抽象クラス（Abstract Class））
 * 具体的な実装を持たない。システムコアのビジネスロジックを表し、低レベルの詳細に依存しないように設計されている
*/
interface Robot {
  work(): string;
}

/**
 * @desc RobotFactoryインターフェース（Creator）
 * @note 高レベルのクラス（抽象クラス（Abstract Class））
 * 具体的な実装を持たない。システムコアのビジネスロジックを表し、低レベルの詳細に依存しないように設計されている
 */
interface RobotFactory {
  createRobot(): Robot;
}

/**
 * @desc ConcreteProduct: ElectronicAssembler
 * @note 具体クラス（Concrete Class）として定義され、抽象クラスに対する具体的な実装内容を持ちます。
 * これらはシステムの詳細な部分を担当し、具体的な動作やデータ構造を定義します。
 */
class ElectronicAssembler implements Robot {
  work(): string {
    return '組立て中';
  }
}

/**
 * @desc ConcreteProduct: EngineRepairer
 * @note 具体クラス（Concrete Class）として定義され、抽象クラスに対する具体的な実装内容を持ちます。
 * これらはシステムの詳細な部分を担当し、具体的な動作やデータ構造を定義します。
 */
class EngineRepairer implements Robot {
  work(): string {
    return '修理中';
  }
}

/**
 * @desc ConcreteCreator: ElectronicAssemblerFactory
 * @note 具体クラス（Concrete Class）として定義され、抽象クラスに対する具体的な実装内容を持ちます。
 * これらはシステムの詳細な部分を担当し、具体的な動作やデータ構造を定義します。
 */
class ElectronicAssemblerFactory implements RobotFactory {
  createRobot(): Robot {
    return new ElectronicAssembler();
  }
}

/**
 * @desc ConcreteCreator: EngineRepairerFactory
 * @note 具体クラス（Concrete Class）として定義され、抽象クラスに対する具体的な実装内容を持ちます。
 * これらはシステムの詳細な部分を担当し、具体的な動作やデータ構造を定義します。
 */
class EngineRepairerFactory implements RobotFactory {
  createRobot(): Robot {
    return new EngineRepairer();
  }
}

/**
 * @desc クライアントコード
 * @note createRobotが共通のメソッドであればよいが、メソッドが違う場合にはジェネリクスを用いれば可能
 */
const electronicAssemblerFactory: RobotFactory = new ElectronicAssemblerFactory();
const electronicAssembler: Robot = electronicAssemblerFactory.createRobot();
console.log(electronicAssembler.work()); // 組立て中

const engineRepairerFactory: RobotFactory = new EngineRepairerFactory();
const engineRepairer: Robot = engineRepairerFactory.createRobot();
console.log(engineRepairer.work()); // 修理中
`;
}

/**
 * @desc Robotインターフェース（Product）
 * @note 高レベルのクラス（抽象クラス（Abstract Class））
 * 具体的な実装を持たない。システムコアのビジネスロジックを表し、低レベルの詳細に依存しないように設計されている
 */
interface Robot {
  work(): string;
}

/**
 * @desc RobotFactoryインターフェース（Creator）
 * @note 高レベルのクラス（抽象クラス（Abstract Class））
 * 具体的な実装を持たない。システムコアのビジネスロジックを表し、低レベルの詳細に依存しないように設計されている
 */
interface RobotFactory {
  createRobot(): Robot;
}

/**
 * @desc ConcreteProduct: ElectronicAssembler
 * @note 具体クラス（Concrete Class）として定義され、抽象クラスに対する具体的な実装内容を持ちます。
 * これらはシステムの詳細な部分を担当し、具体的な動作やデータ構造を定義します。
 */
class ElectronicAssembler implements Robot {
  work(): string {
    return '組立て中';
  }
}

/**
 * @desc ConcreteProduct: EngineRepairer
 * @note 具体クラス（Concrete Class）として定義され、抽象クラスに対する具体的な実装内容を持ちます。
 * これらはシステムの詳細な部分を担当し、具体的な動作やデータ構造を定義します。
 */
class EngineRepairer implements Robot {
  work(): string {
    return '修理中';
  }
}

/**
 * @desc ConcreteCreator: ElectronicAssemblerFactory
 * @note 具体クラス（Concrete Class）として定義され、抽象クラスに対する具体的な実装内容を持ちます。
 * これらはシステムの詳細な部分を担当し、具体的な動作やデータ構造を定義します。
 */
class ElectronicAssemblerFactory implements RobotFactory {
  createRobot(): Robot {
    return new ElectronicAssembler();
  }
}

/**
 * @desc ConcreteCreator: EngineRepairerFactory
 * @note 具体クラス（Concrete Class）として定義され、抽象クラスに対する具体的な実装内容を持ちます。
 * これらはシステムの詳細な部分を担当し、具体的な動作やデータ構造を定義します。
 */
class EngineRepairerFactory implements RobotFactory {
  createRobot(): Robot {
    return new EngineRepairer();
  }
}

/**
 * @desc クライアントコード
 * @note createRobotが共通のメソッドであればよいが、メソッドが違う場合にはジェネリクスを用いれば可能
 */
const electronicAssemblerFactory: RobotFactory = new ElectronicAssemblerFactory();
const electronicAssembler: Robot = electronicAssemblerFactory.createRobot();
console.log(electronicAssembler.work()); // 組立て中

const engineRepairerFactory: RobotFactory = new EngineRepairerFactory();
const engineRepairer: Robot = engineRepairerFactory.createRobot();
console.log(engineRepairer.work()); // 修理中