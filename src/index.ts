#! /usr/bin/env node

// Messy right now. Early wip.
// TODO add tag/replace single line support

import chalk from 'chalk';
import { readFile, writeFile } from 'fs-extra';
import { parseFile } from './parseFile/parseFile';
import { Program } from './main/consts';
import { Dict } from './main/types';

// TODO? check installed mdol version in the package. When running `npx mdol`, it shall check the major/minor version...
// ^ that would probably be a hell. Maybe only check for major if really change something that would break the readme, but inform
// that an older version is being used and it should be updated.

// TODO in `mdol clean`, add an option to remove all the tags and inside tags comments


// Have your typedoc on watch, and have a ts-node-dev including the docs and README.hbs to run this.
async function run() {
  const defaultFiles = [
    Program.pathFromCwd('README.md'),
    Program.pathFromCwd('CHANGELOG.md'),
  ];
  const filesPaths = [...defaultFiles];
  const dict: Dict = {}; // TODO add .mdol.js read

  for (const filePath of filesPaths) {
    const fileContent = (await readFile(filePath)).toString();
    const newFileContent = await parseFile(fileContent, { dict });
    await writeFile(filePath, newFileContent);
  }

  console.log(`mdol completed! ${filesPaths.length} files were parsed.`);
}


void run().catch(err => {
  let msg;
  if (typeof err === 'object' && err !== null)
    msg = err.message;
  else
    msg = err;
  console.error(`\n${chalk.redBright('An error happened!')} ${chalk.white('-')} ${chalk.yellow(`[${Program.name} v${Program.version}]`)}\n`);
  console.error(msg);
  process.exit(1); // Good for external tools.
});
