# Adapter(アダプター) または Wrapperパターンとも呼ばれる

互換性のないインターフェイスを接続する。  
既存クラスのインターフェイスを新しいインターフェイスに変換するデザインパターン。このパターンを利用することで、インターフェイスの互換性がないクラスが一緒に動作するようになる。

## 基本的な考え方

基本的な考え方は、既存のコード（クラスや関数など）を新しいインターフェイスや要件に適合させるための"中間層"を作成することです。この中間層がアダプターとなります。

## シチュエーション

1. 既存のクラスを再利用したいが、そのクラスのインターフェイスが新しいシステムの要件と一致しない場合。
2. 既存のクラスと新しいクラスのインターフェイスを一致させたい場合。

## メリット

- 既存コードの再利用が可能になる
- クラス間の互換性を構築するのが簡単になる
- システム内の独立性が高まる。

## デメリット

