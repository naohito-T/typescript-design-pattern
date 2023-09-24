/**
 * @see https://zenn.dev/mutex_inc/articles/quit-dotenv-file
 */
export const ApplicationStage = {
  local: 'local', // ローカル環境
  dev: 'dev', // 開発環境
  prod: 'prod', // 本番環境
} as const;

export type ApplicationStageType = (typeof ApplicationStage)[keyof typeof ApplicationStage];

export class BaseEnv {
  /**
   * @if   process.env.STAGEがセットされていることを確認する
   * @else process.env.stageがApplicationStageのメンバであることを確認する
   */
  public static get stage(): ApplicationStageType {
    const STAGE = process.env.STAGE;
    if (STAGE === undefined) {
      throw new Error(`process.env.STAGE undefined`);
    } else if (!Object.values(ApplicationStage).some((value) => STAGE === value)) {
      throw new Error(`process.env.STAGE is invalid. Set to local, dev, or prod.`);
    }
    return STAGE as ApplicationStageType;
  }

  public static get isProd(): boolean {
    return this.stage === ApplicationStage.prod;
  }

  public static get isDev(): boolean {
    return this.stage === ApplicationStage.dev;
  }

  public static get isLocal(): boolean {
    return this.stage === ApplicationStage.local;
  }
}
