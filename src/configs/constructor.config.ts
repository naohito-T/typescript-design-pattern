/** @desc 定数管理 */
export class Constructor {}

/** @desc help 文言定数管理 */
export class HelpConstructor {
  public static CREATIONAL = class {
    public static readonly CREATIONAL_DESC =
      'Creational（生成に関する）デザインパターンは、オブジェクトの生成メカニズムに関するパターン。この種のパターンは、オブジェクトの生成をより柔軟にし、より効果的に制御する方法を提供します。具体的には、システムが依存するオブジェクトの具体的なクラスを直接指定せずに、オブジェクトの作成を行います。';

    public static readonly FACTORY_METHOD =
      'サブクラスにインスタンス化するクラスを選択させるパターン。これによりクラスのインスタンス生成の責任がサブクラスに移譲される。';

    public static readonly ABSTRACT_FACTORY = '関連するオブジェクトの家族を一貫して生成するためのインターフェースを提供します。具体的なクラスの実装をクライアントから分離します。';

    public static readonly BUILDER = 'オブジェクトの構築とその表現を分離することで、同じ構築プロセスで異なる表現のオブジェクトを生成することができます。'

    public static readonly PROTOTYPE = '既存のオブジェクトをコピーして新しいオブジェクトを生成するためのメカニズムを提供します。'
  };

  public static STRUCTURAL = class {};

  public static BEHAVIORAL = class {};
}
