import { typePrefix, tag } from '../main/consts';
import { TagStyle, TagType } from '../main/types';

export const tagOpenerStart = '<!--\\$';
export const tagCloserStart = '<!--/\\$';
export const tagEnd = '-->';

type Opts = {
  /** @default 'open' */
  style?: TagStyle;
  /** @default 'none' */
  type?: TagType;
  /** @default true */
  addNewLine?: boolean;
};

/** @param content - Placed right next to the prefix. */
export function getTag(content: string, options?: Opts): string {
  const opts: Required<Opts> = {
    style: 'open',
    type: 'none',
    addNewLine: true,
    ...options,
  };
  let result = '';

  if (opts.style === 'close')
    result += tag.closerStart;
  else
    result += tag.openerStart;

  result += ` ${typePrefix[opts.type]}${content} `;

  if (opts.style === 'selfClose')
    result += tag.endSelfClose;
  else
    result += tag.end;

  if (opts?.addNewLine)
    result += '\n';
  return result;
}