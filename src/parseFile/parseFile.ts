import { Dict } from '../main/types';
import { getAbout } from '../tags/meta/about';
import { getInfo } from '../tags/meta/info';
import { removeAllMetaTags } from '../tags/removeTag';
import { getPropsInFile } from './getAllProps';
import { parseProp } from './parseProp/parseProp';
import { populateTag } from './populateTags';





export async function parseFile(fileContent: string, { dict }: {dict: Dict}): Promise<string> {
  let result = fileContent;
  /** Remove previous meta tags. */
  result = removeAllMetaTags(fileContent);
  result = result.trim();

  /** Convert tags */
  const allProps = getPropsInFile(fileContent);
  for (const prop of allProps) {
    // TODO: try-catch this, and on catch include the filename and the line of the error, in the file, in
    // its original state.
    const content = await parseProp(prop, { dict });
    result = populateTag(result, prop, content);
  }

  /** Add meta tags */
  result = `${getAbout()}${getInfo()}\n${result}\n${getAbout()}`;

  return result;
}