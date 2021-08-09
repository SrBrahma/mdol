import { Program } from '../../main/consts';
import { getTag } from '../getTag';

const aboutMsg = `Markdown populated with ${Program.name}: https://github.com/SrBrahma/${Program.name}.
To repopulate it, run \`npx ${Program.name}\` in the project root.`;

/** @param message replaces the default message. */
export function getAbout(message?: string): string {
  return getTag(`about ${message ?? aboutMsg}`, { addNewLine: true, type: 'meta', style: 'selfClose' });
}