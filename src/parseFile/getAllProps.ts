import { tag } from '../main/consts';

/** Props that follow the basic <!--$ prop --> format. Props may not be valid. */
export function getPropsInFile(fileContent: string): string[] {
  // const getMetaTags = false;
  // const nonInfoPropRegex = '[^!]+.*';
  // const allPropsRegex = '.+';
  // const propsRegex = getMetaTags ? allPropsRegex : nonInfoPropRegex;

  const matches: string[] = ([
    ...fileContent.match(new RegExp(
      `(?<=${tag.openerStartEscaped}\\s*).+?(?=\\s*${tag.endEscaped})`, 'sg',
    )) ?? [],
  ]).map(e => e.trim()); // we have to trim because couldn't get lookbehind to be greedy and get all the whitespaces
  return matches;
}