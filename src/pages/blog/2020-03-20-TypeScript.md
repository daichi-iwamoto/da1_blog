---
templateKey: blog-post
mainv: /img/programming.jpg
title: 【2020年】いまさら始めるTypeScript入門
date: 2020-03-20T09:24:05.569Z
description: 2020年から始める【TypeScript】入門。
featuredpost: true
featuredimage: /img/apple-touch-icon.png
tags:
  - Technical article
---

VueやReactなどの新しいフレームワークに夢中になっている間、ずっと見て見ぬふりをしてきたTypeScript。
そろそろやらねば。という事で、今更ながらTypeScript勉強してみました。

## 導入
今回はnpm（Node.jsのパッケージマネージャー）を使用して導入をしていきます。Windows環境です
下記コマンドをbash等のターミナルで叩いてみましょう。

```bash
npm install -g typescript
```

導入はこれで終了です。
>( ˘ω˘ ).。o○（あれ…速攻できるやん…）

## TypeScriptを書いてコンパイルしてみる
コマンド一つで導入できてしまったので、とりあえずTypeScriptを書いてみます。
`test.ts`というファイルを作成して、下記の様なコードを書いてみましょう。
```javascript
function hello(name: string) {
  return "Hello! " + name + "!";
}

let you = "dummy men";

console.log(hello(you));
```
コード内容的には、よくあるhello worldです。引数の所に何やら見えるかもしれませんが、
一旦脳死でコピーしてください。

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
先ほど作成した`test.ts`の`hello`関数の引数が、通常のJavaScriptの形式では見慣れない
記載方法だったかと思います。これが何かといいますと、そうです。「型」です。

`hello(name: string)`は「引数`name`は`string型`じゃないとこの関数は使えませんよ！」という事を定義しています。
試しに、`let you = "dummy men";`の箇所を`let you = 4649;`や`let you = ["iam", "dummy men"];`といった
string以外の型して、再度コンパイルしてみましょう。すると、エラーメッセージが返されるはずです！
>( ˘ω˘ ).。o○（コンパイルのタイミングで簡単な単体テストの様な事ができるんや…便利…）

## TypeScriptの「インターフェース」について
先ほど作成した`test.ts`を下記の様に改造してみましょう。
```javascript
interface Person {
  firstName: string;
  lastName: string; 
}

function hello(person: Person) {
  return "Hello! " + person.firstName + person.lastName + "!";
}

let you = { firstName: "Dummy", lastName: "Men"};

console.log(hello(you));
```
私の様な「オブジェクト指向浅瀬ちゃぷちゃぷ勢」の為に解説。
`function hello(person: Person)`の`Person`というのがインターフェースになります。


## TypeScript 環境構築編

使用ツールはこんな感じ↓
* npm (Node.js)
* webpack

まずはディレクトリを作成して、`npm init`しましょう。
私の場合は、`TypeScript-Test`というディレクトリを作成しました。
```bash
mkdir TypeScript-Test
cd TypeScript-Test
npm init
```

次にTypeScriptコンパイラ・ローダーのインストールを行います。
```bash
npm install --save-dev typescript ts-loader
```