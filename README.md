# mdol

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)
[![npm](https://img.shields.io/npm/v/mdol)](https://www.npmjs.com/package/mdol)
[![npm](https://img.shields.io/npm/dw/mdol)](https://www.npmjs.com/package/mdol)

Simple and easy way to populate Markdowns automatically, like README.md file. Handlebars simpler alternative.

<br/>

# 🏗️Project still in very early dev state!

## **You shouldn't use this right now. I may or not already be using this in some personal projects, but it isn't publicly ready yet. Also, this README is more like a draft right now -- not everything here is already implementeded or even will ever be.**

<br/>


## ⤴️ Motivation
* I kept editing by mistake my README.md instead of the README.hbs.
* I wanted some nice warns/reminders on the README.md if that part was code-generated.
* I don't like documentating at all, so I wanted a more plug and play solution, without having to learn too much new stuff about it.
* `{{}}`, as Handlebars/Mustache uses, is annoying for React projects.
* Integration with `typedoc` and `typedoc-plugin-markdown`.
* Contributors had to deal with the .hbs to change the README. Not newbie friendly at all.
* Inform the contributor where the data is being generated, where it can be changed.
* Inform in the README how to generate the doc.
* Tags for common content, like badges and accessing typedoc content.
* I wanted it to be in my way! 🤠

## Philosophy
* Easy for anyone to edit the README. Intuitive and quick to catch up.
* No need to `npm i` to change the README. The `prepare` script **in .mdol.js** must contain `npx` packages calls or local functions.
* .mdol.js alone should usually be able to contain all the README needs.
* Integration with common tools
* Now focusing in JS/TS env, but it shall also have space for supporting other languages in the future.

## Usage
```md
<!--$ yourProp -->
<!--/$ yourProp -->
```

No-spaces around are allowed: `<!--$yourProp-->`

### Prop/Segment
#### Function
* The arguments are parsed as JSON5.
* `undefined` value is not supported, but `null` is.
* They may either return a string or an object, so nested access with function returns is supported.

**When closing, `/` before the `$`!!** It's more noticeable that way.

```
<!--$ @typedoc-md.interface(ShadowI, {table})->>
```
*maybe #? Automatic stringify. Do also allow string version.*
*just {prop} will set it as true.*

`<!--$badges-->` will call badges() with some default argument, like reading .mdol.js badges config. This allows props becoming functions if now it may accept arguments.

```
<!--$@typedoc-md.interface(ShadowI)-->
<!--/$->
```
*Closes the previous tag.*
```
<!--$yourProp/-->
```
*This will be converted to an open/close tag on compilation.*

* In VSCode, if you `Ctrl+/` in your .md file, it will comment the current line with `<!-- -->`. Just add the **`$`** to it!

<!--$ @typedoc-md.interface -->
TODO `npx mdol clean` - Clear all tags content.

### Tag Type
#### None: dict: entries entered on the **.mdol.js** file.
#### **@** - script: Like dict, but for common usage.
#### **!** - meta: Information that **mdol** has entered about it on the Markdown file.
* !warn - Informs the human editor that him should not edit this file, but edit the source where the info was adquired. It's included between generated lines.
* !info - Header and footer informing the human editor about the **mdol** package.
* !buildInfo - Added after the header with some informations, like **mdol** version and when the last compilation of the Markdown file happened, in UTC format.

<br/>

## Installation
```bash
npm install -D mdol
# or
yarn add -D mdol
# or run directly with npx
npx mdol
```

## [Changelog](CHANGELOG.md)

## Name
I somewhat randomly opted for the $ char at the tag, like `<!--$yourProp-->`.
Markdown, md. $, dolar. *mdolar?* **mdol!**

## Future
* Add guide for people who are contributing to some README.md.
Link this guide on the README signs.
* In this guide or near it, have the scripts descriptions.
* Commands, with # prefix:
  * #for (maybe not needed)
