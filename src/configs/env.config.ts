import { EnvVar } from '@/decorator';

export class Environment {
  /** @desc アプリケーションのversion */
  @EnvVar({ default: process.env.VERSION })
  public static readonly VERSION: string;
}
