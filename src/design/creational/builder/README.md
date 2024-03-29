# Builder パターン

## 概要

Builderパターンは、デザインパターンの中の生成（Creational）パターンのひとつで、複雑なオブジェクトの生成をステップバイステップで行うための方法を提供する。  
オブジェクトの生成とその表現を分離することで、同じ生成プロセスで異なる表現のオブジェクトを生成できるようにするのが目的です。

## いつ使用すべきか

`constructor`に対して数多くのパラメーターをセットする必要がある場合に、代わりに使用することが推奨されている。

- コンストラクターの引数が多い
- コンストラクターに設定する引数が**任意のもの**が多い。
- オブジェクトが複数の部分から成り立ち、部分ごとに異なる構築プロセスが必要な場合。
- オブジェクトの構築プロセスが同じでも、異なる表現や形式のオブジェクトを生成したい場合。
- クライアント側でオブジェクトの内部構造を知らないで、複雑なオブジェクトを生成したい場合。


## この設計パターンで使われる言葉

- Director
    Builderパターンにおいて、Directorはオブジェクトの構築プロセスを制御する役割を持ちます。
    DirectorはBuilderインターフェイスを利用して、オブジェクトの構築を段階的に行い、最終的な製品を生成します。
    つまり、Directorはどの部品をどの順番で組み立てるかを決定し、Builderがその指示にしたがって具体的な構築作業を行う、という関係になります。

Builderパターンとは、このような、「作成過程」を決定する`Director`と呼ばれるものと「表現形式」を決定する`Builder`と呼ばれるものを組み合わせることで、オブジェクトの生成を柔軟にしオブジェクトの作成過程をコントロールすることができるようにするためのパターン

## メリット

1. **分離されたコード**: オブジェクトの構築コードがその他のコードから分離されるため、システムがよりモジュール化され、メンテナンスが容易になります。

2. **異なる形式のオブジェクト生成**: 同じ構築プロセスで異なる形式のオブジェクトを生成できます。

3. **コードの再利用**: 同じビルダークラスを異なるディレクターで再利用することが可能。

4. **パラメータライズドコンストラクション**: パラメーターの多いコンストラクターを持つクラスのインスタンス化を簡単にし、コードの可読性を向上させます。

## デメリット

1. **クラスの増加**: Builderパターンを使用すると、新しいBuilderインターフェイスおよび実装クラスが追加されるため、システムのクラスの数が増えます。

2. **オーバーヘッド**: シンプルなオブジェクトに対してBuilderパターンを適用すると、設計が複雑になり、オーバーヘッドが生じる可能性があります。

### デメリットの解決策:

1. **適切な使用**: Builderパターンは、コンストラクターに多くのパラメーターがあるか、オブジェクトの構築が複雑な場合に適しています。シンプルなオブジェクトには、このパターンを避けるべきです。

2. **ドキュメントとコードの整理**: クラスの数が増えるデメリットを軽減するために、ドキュメントを整備し、クラスを適切にパッケージ化またはモジュール化してコードを整理します。
