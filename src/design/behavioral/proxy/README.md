# Proxyパターン

## 概要

英語で代理人という意味。  
Proxyパターンは、あるオブジェクトへのアクセスを制御するための「代理」や「中間」オブジェクトを提供します。  
この中間オブジェクト（Proxy）は、アクセス対象となる実際のオブジェクト（RealSubject）のインターフェイスを実装し、そのオブジェクトへのアクセスの前後で追加の操作を行うことができます。

## いつ使用すべきか

- 実際のオブジェクトへのアクセスを遅延させたい場合。
- オブジェクトへのアクセスを制御したいとき（例：アクセスログの記録、アクセス制限など）。
- ネットワーク経由でリモートオブジェクトにアクセスする場面で、ローカルにそのオブジェクトの代理を持ちたい場合。

## メリット

- 実際のオブジェクトへのアクセスを抽象化することで、アクセスの制御や追加の動作を簡単に導入できる。
- Open/Closed Principle（オープン/クローズドの原則）に従い、既存のコードを変更せずに新しい機能を追加できる。

## デメリット

- 新しいProxyクラスが増えることで、システムの複雑性が増す可能性がある。
- Proxyが介在することで、パフォーマンスに若干のオーバーヘッドが生じることがある。




