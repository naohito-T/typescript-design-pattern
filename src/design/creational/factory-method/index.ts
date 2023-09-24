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
