---
templateKey: blog-post
mainv: /img/programming.jpg
title: Gatsby.jsにユニットテストツールJestを導入する
date: 2020-03-27T09:24:05.569Z
description: このブログサイトで使用しているReact製静的サイトジェネレータGatsbyに、JavaScriptユニットテストツールであるJestを導入してみたいと思います。筆者はそもそもJestをあまり勉強した事が無いので、Jestの基本的な使い方～Gatsbyへの導入までを書いていこうと思います！
featuredpost: true
featuredimage: /img/apple-touch-icon.png
tags:
  - Technical article
---

前回の記事で書いたTypeScript同様、必要な事だけれども必須ではない事を後回しにしてきた筆者。<br>
今回はユニットテストツールであるJestを学習していこうと思います。

## 記事の流れ
1. Jestの基本的な使い方。
2. GatsbyにJestを導入。

## Jestとは
そもそもJestとは何かというと、JavaScriptのテスティングフレームワークです。<br>
JSの関数等のテストを行いやすくしてくれます。<br>
最近の求人情報等を見てみると歓迎要件として「テストコードを書いたことがある方」というのをよく見かけます。
ひとまず[公式サイト](https://jestjs.io/docs/ja/getting-started.html)を参考に基本的な使い方を学んでみましょう。

### 導入
今回は`npm`で導入します。まずはテスト用のディレクトリを作成しましょう。<br>
node.jsでテストコマンドを打つように、`package.json`を作成して、下記コマンドを設定してください。
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

次にディレクトリ内で下記コマンドを打ってください。
```bash
npm install --save-dev jest
```

### テストコードを書いてみる
ではさっそくテストコードを書いていきましょう！<br>
まずは、テスト対象となるコード作成しましょう。下記の様な`dummy.js`ファイルを作成します・
```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

次に下記のような、`dummy.test.js`を作成してください。
```javascript
const sum = require('./dummy');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### テストを実行してみる
テストするコードと、テストコードの準備ができたので、さっそく実行していきましょう。<br>
これで準備ができたので、テストコマンドを打ってみましょう！
```bash
npm run test
```

## GatsbyにJestを導入
何となく使い方が分かった所で、さっそくGatsbyにJestを導入してみましょう！
こちらも[Gatsbyの公式](https://www.gatsbyjs.org/docs/unit-testing/)の方を参考に行っていきます。
コマンド一つで導入できてしまったので、とりあえずTypeScriptを書いてみます。<br>
試しに`test.ts`というファイルを作成して、下記の様なコードを書いてみましょう。

```javascript
function hello(name: string) {
  return "Hello! " + name + "!";
}

let you = "dummy men";

console.log(hello(you));
```
コード内容的には、よくあるhello worldです。引数の所に何やら見えるかもしれませんが、
一旦スルーしてコピーしてください。

次に、作成した`test.ts`をコンパイルしていきます。下記コマンドを叩いてみましょう。
```bash
tsc test.ts
```
すると、`test.ts`を作成した同一ディレクトリに、`test.js`というJavaScriptの形式に
されたファイルが出現するはずです。これでコンパイルも完了。

では、実際にコードを実行してみましょう。ターミナルで下記の様にコマンドを叩いてみてください。
```bash
node [該当のパス]/test.js
```

すると「Hello! dummy men!」と表示されるはずです！
>( ˘ω˘ ).。o○（あ、あれれ…速攻できるやん…）

## TypeScriptの「型」について
先ほど作成した`test.ts`の`hello`関数の引数が、通常のJavaScriptの形式では見慣れない記載方法だったかと思います。<br>
これが何かといいますと、そうです。「型」です。

`hello(name: string)`は「引数`name`は`string型`じゃないとこの関数は使えませんよ！」という事を定義しています。
試しに、`let you = "dummy men";`の箇所を`let you = 4649;`や`let you = ["iam", "dummy men"];`といった
string以外の型して、再度コンパイルしてみましょう。すると、エラーメッセージが返されるはずです！

今回、詳細な説明は省きますが「interface」や「class」などにも対応しています。
>( ˘ω˘ ).。o○（コンパイルのタイミングで簡単な単体テストの様な事ができるんや…便利…）

## TypeScript 環境構築編

それでは実際にTypeScriptを開発で使用する為に、環境構築を行っていきましょう。<br>
この記事を書き始めた当初は、webpackを使用してガチガチの開発環境を構築しようと思っていたのですが、<br>
調べていくうちに「純粋にTypeScriptだけを導入するだけならばnpm-scriptだけで環境構築ができるのでは？」<br>
と思ったので、npm-scriptのみで開発環境を構築してみました。

> ( ˘ω˘ ).。o○（webpackでの環境構築は他に素敵な記事が大量にあったしね…）

まずはディレクトリを作成して、`npm init`しましょう。
私の場合は、`TypeScript-Test`というディレクトリを作成しました。
```bash
mkdir TypeScript-Test
cd TypeScript-Test
npm init
```

次にTypeScripをインストールします。今回はgit等で開発環境を共有するために`-D`オプションを付けましょう。
```bash
npm install -D typescript
```

インストールが完了し、node_modulesディレクトリが作成されたら<br>
`tsconfig.json`を作成しましょう。ここではtsファイルのコンパイル先のディレクトリを指定したり<br>
コンパイルの形式を指定したりすることができます。細かい設定については[TypeScriptの公式ドキュメント](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)を参照しましょう。<br>

`tsconfig.json`を下記の様に記載してください。
```json
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outDir": "./dist/js/",    // 書き出しフォルダの指定
  },
  "include": [
    "./src/ts/*.ts"            // 監視対象の指定
  ],
  "exclude": [
    "./node_modules",
    "**/*.spec.ts"
  ]
}
```
コード内にもコメントアウトで記載はしていますが、主に注目して頂きたいのは`outDir`と`include`の箇所になります。<br>
`include`で次の工程で説明する監視コマンドの、監視対象を指定しています。<br>
`outDir`ではコンパイルされたデータを吐き出すディレクトリを指定しています。ここを`outFile`として、<br>
ファイル名を指定すると、すべてのtsファイルを指定した1つのファイルに連結して出力してくれます。

次に、`package.json`を下記の様に記述してください。
```json
{
  "name": "typescript-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "watch": "tsc -w"      // ここでwatch scriptを設定
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^3.8.3"
  }
}
```
変更するのは`script`の個所ですが、見てもらうとわかる通りめちゃくちゃ簡単ですね。

## 実際にコンパイルしてみる
では最後に実際にコンパイルしてみましょう。`tsconfig.json`で指定した通り、
`./src/ts/`ディレクトリ内に`index.ts`を作成して、この記事のはじめにテストしてみた下記コードをコピペしてみましょう。
```js
function hello(name: string) {
  return "Hello! " + name + "!";
}

let you = "dummy men";

console.log(hello(you));
```
そして、さきほど`package.json`で設定した下記コマンドを打ってみます。
```
npm run watch
```

すると、`./dist/js/index.js`というjsファイルが出力されているはずです！<br>
`./src/ts/`ディレクトリ内に他の名前のtsファイルを作成すると、`./dist/js/`ディレクトリに<br>
出力が行われることが確認できるかと思います。また、この記事のはじめの方で行ったように<br>
型の違反を行うと、しっかりエラーメッセージが返されます！

## 感想
ずっと避けてきたnpm-scriptですが、意外に簡単に入門できました！<br>
次は今まで素のjsで書いていたものをTypeScriptで置き換えていく記事が書けたらと思っています！