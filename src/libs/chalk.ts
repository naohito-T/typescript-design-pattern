import * as chalk from 'chalk';

export type Chalk = typeof chalk;

export class ChalkClient {
  private c: Chalk | null = null;

  public getChalk = (): Chalk => {
    if (!this.c) {
      this.c = chalk;
    }
    return this.c;
  };
}
