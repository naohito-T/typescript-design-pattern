/** @description designで実装するinterface */
export interface DesignPatternInfo {
  // そのdesignパターン説明
  description: () => string;
  // フローチャート
  flowChart: () => string;
  // exampleコードを表示する
  exampleCode: () => string;
  // exampleコードを実行
  exec: () => void;
}
