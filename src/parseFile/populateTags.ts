import { tag } from '../main/consts';
import { getWarn } from '../tags/meta/warn';

type PopulateTagsOptions = {
  /** Added a blank line between the tags and the content; 1 above the content and 1 below. */
  emptyLineAround?: boolean;
  /** Will add warns before the content, between each content line, and after the content. */
  addWarnBetweenLines?: boolean;
  warnText?: string;
};

// TODO same line support.
export function populateTag(fileContent: string, prop: string, content: string, options: PopulateTagsOptions = {}): string {

  const opts: PopulateTagsOptions = {
    ...{
      addWarnBetweenLines: true,
      emptyLineAround: true,
      warnText: undefined,
    }, ...options ?? {},
  };

  const escapedProp = prop; // FIXME
  const openTagRegexed = `${tag.openerStartEscaped}\\s*${escapedProp}\\s*${tag.endEscaped}`;
  // Separated because we will later have other closers.
  const closeTagRegexed = `${tag.closerStartEscaped}\\s*${escapedProp}\\s*${tag.endEscaped}`;

  // Not using global here because we are only changing the given prop.
  // Doing this because prop may contain a function that may output different results on each call.
  const regex = new RegExp(`(?<=${openTagRegexed}).*(?=${closeTagRegexed})`, 's'); // https://www.codeguage.com/courses/regexp/flags

  // Start with a final new line.
  // TODO content changing should be outside this function!
  let contentToBeAdded = content.trim();

  if (opts.addWarnBetweenLines) {
    const warnText = getWarn(opts.warnText?.trim(), { addNewLine: false });
    // Add warn after all newlines
    contentToBeAdded = contentToBeAdded.replace(/(?<=\n)/g, warnText + '\n'); // global for all new lines match
    // Add warn before and after the content
    contentToBeAdded = warnText + '\n' + contentToBeAdded + '\n' + warnText;
  }

  contentToBeAdded = `\n${contentToBeAdded}\n`;

  if (opts.emptyLineAround)
    contentToBeAdded = `\n${contentToBeAdded}\n`;


  const result = fileContent.replace(regex, contentToBeAdded);

  return result;
}
