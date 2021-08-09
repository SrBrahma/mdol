import path from 'path';
import { TagStyle } from './types';


const pkgJson = require('../../package.json') as Record<string, string>;
/** General and commonly used info about this program. */
export const Program = {
  /** From package.json */
  name: pkgJson.name,
  version: pkgJson.version,
  /** Reflects process.cwd() */
  cwd: process.cwd(),
  /** Path of the src/ dir, or lib, if compiled. */
  srcPath: path.join(__dirname, '..'),
  /** Path of the program root dir, where for example is the package.json. */
  rootPath: path.join(__dirname, '..', '..'),
  /** Short for path.join(Program.cwd, ...segments) */
  pathFromCwd: (...segments: string[]): string => path.join(Program.cwd, ...segments),
  /** Short for path.join(Program.srcPath, ...segments) */
  pathFromSrc: (...segments: string[]): string => path.join(Program.srcPath, ...segments),
  /** Short for path.join(Program.rootPath, ...segments) */
  pathFromRoot: (...segments: string[]): string => path.join(Program.rootPath, ...segments),
};


// May have whitespaces after tagXStart and tagEnd.
export const tag = {
  openerStart: '<!--$',
  closerStart: '<!--/$',
  end: '-->',
  endSelfClose: '/-->',
  openerStartEscaped: '<!--\\$',
  closerStartEscaped: '<!--/\\$',
  endEscaped: '-->',
  endSelfCloseEscaped: '/-->',
} as const;


export const typePrefix = {
  /** E.g. <!--$ @typedoc-md --> */
  plugin: '@',
  /** E.g. <!--$ !warn --> */
  meta: '!',
  /** E.g. <!--$ #for --> */
  command: '#',
  /** Here so we can prefix[type], being type also none. */
  none: '',
} as const;

export const styleToTagStartEscaped: Record<TagStyle, string> = {
  open: tag.openerStartEscaped,
  close: tag.closerStartEscaped,
  selfClose: tag.openerStartEscaped,
} as const;

export const styleToTagEndEscaped: Record<TagStyle, string> = {
  open: tag.endEscaped,
  close: tag.endEscaped,
  selfClose: tag.endSelfCloseEscaped,
} as const;
