---
templateKey: blog-post
mainv: /img/programming.jpg
title: 【2020年】いまさら始めるTypeScript入門【npm-script】
date: 2020-03-27T09:24:05.569Z
description: 【2020年】いまさら始めるTypeScript入門【npm-script】。簡単なTypeScriptを実際に実装してみます。この記事を書き始めた際は、webpackを用いて開発環境を構築する手順の紹介をしようかと思ったのですが、調べているうちに「純粋にTypeScriptだけを導入するだけならばnpm-scriptだけで環境構築ができるのでは？」と思ったので、npm-scriptでコンパイルを行う方法を紹介します。
featuredpost: true
featuredimage: /img/apple-touch-icon.png
tags:
  - Technical article
  - TypeScript
---

VueやReactなどの新しいフレームワークに夢中になっている間、ずっと見て見ぬふりをしてきたTypeScript。
そろそろやらねば。という事で、今更ながらTypeScript勉強してみました。

## 記事の流れ
1. TypeScriptに触れてみる。
2. TypeScriptをコンパイル・実行してみる。
3. npm-scriptを用いた開発環境例の紹介。

## 導入
ひとまず環境構築をする前に、[公式サイト](https://www.typescriptlang.org/)を参考にTypeScriptを軽く触ってみましょう。


今回はnpmを使用して導入をしていきます。Windows環境です。<br>
下記コマンドをbash等のターミナルで叩いてみましょう。

```bash
npm install -g typescript
```

導入はこれで終了です。
>( ˘ω˘ ).。o○（あれ…速攻できるやん…）

## TypeScriptを書いてコンパイルしてみる
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