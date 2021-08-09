import { styleToTagEndEscaped, styleToTagStartEscaped, typePrefix } from '../main/consts';
import { TagStyle, TagType } from '../main/types';
import escapeStringRegexp from 'escape-string-regexp';


type Options = {
  style: TagStyle; // | 'openAndClose'
  /** @default none */
  type?: TagType;
  /** @default false */
  removeAll?: boolean;
  /** If prop will be regex-escaped.
   * @default false, as it won't be usually used. */
  escapeProp?: boolean;
};

/** Removes the tag, erases the <!--$ ... -->. */
export function removeTag(fileContent: string, prop: string, options: Options): string {
  const { type, style, removeAll, escapeProp }: Required<Options> = {
    type: 'none',
    removeAll: false,
    escapeProp: false,
    ...options,
  };
  const prop2 = escapeProp ? escapeStringRegexp(prop) : prop;
  let searchValue = '';
  // if (removeWhitespaceBefore)
  //   searchValue += '\\s*';
  searchValue = `${styleToTagStartEscaped[style]}\\s*${typePrefix[type]}${prop2}\\s*${styleToTagEndEscaped[style]}`;
  /** Remove whitespace after */
  searchValue += '\\s*';
  let flags = '';
  if (removeAll)
    flags += 'g';
  return fileContent.replace(new RegExp(searchValue, flags), '');
}

export function removeAllMetaTags(fileContent: string): string {
  return removeTag(fileContent, '.*?', {
    style: 'selfClose', type: 'meta', removeAll: true,
  });
}
