import { Program } from '../../main/consts';
import { getTag } from '../getTag';
import JSON5 from 'json5';

/** Includes newline at the end. */
export function getInfo(additionalProperties?: Record<string, any>): string {
  const info = {
    updatedAt: (new Date()).toISOString(),
    mdolVersion: Program.version,
    ...additionalProperties,
  };
  const infoString = `info ${JSON5.stringify(info)}`;

  return getTag(infoString, { addNewLine: true, type: 'meta', style: 'selfClose' });
}