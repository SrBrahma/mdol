import path from 'path';
import { Program } from '../main/consts';



/** The loaded scripts. */
const scripts: Record<string, any> = {};

/** Throws error if script doesn't exist. */
export async function getScript(scriptName: string): Promise<any> {
  if (!scripts[scriptName]) {
    // TODO add support for third parties plugins / npm packages.
    const newScript = await import(path.join(Program.srcPath, 'scripts', 'scripts', scriptName));
    scripts[scriptName] = newScript.default ?? newScript;
  }
  return scripts[scriptName];
}
