import { QuestionCollection, Question, Answers } from 'inquirer';

export abstract class BaseCommand<T extends Answers> {
  /** @description Questionを実行するときの概要メッセージとリスト */
  protected abstract question: QuestionCollection<T>;

  /** @description command 実行メソッド */
  protected abstract run(): void;

  /** @description 大カテゴリ > 小カテゴリ選択メソッド */
  // protected abstract selectCategory(): string;

  /** @description questionを組み立てる */
  protected buildQuestion = (question: Question<T>): QuestionCollection<T> => [{ ...question }];
}
