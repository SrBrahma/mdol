function getAllProps(fileContent: string): string[] {
  const matches = [...fileContent.matchAll(new RegExp(`(?<=${tagOpenerStart}\\s*).(?=\\s*${tagEnd})`, 's'))];
  return matches.map(m => m[0]!);
}
type Dict = Record<string, any>


async function parseFile(fileContent: string, { dict }: {dict: Dict}): Promise<string> {
  let result = fileContent.trim();
  const allProps = getAllProps(fileContent);
  for (const prop of allProps) {
    const content = await parseProp(prop, { dict });
    result = populateTags(result, prop, content);
  }
  const doSign = true;
  if (doSign) {
    result = `${sign}\n\n${result}\n\n${sign}`;
  }

  return result;
}


type PopulateTagsOptions = {
  /** **false:**
   * ```html
   * <!--$prop-->
   * content
   * <!--/$prop-->
   * ```
   * **true:**
   * ```html
   * <!--$prop-->
   *
   * content
   *
   * <!--/$prop-->
   * ```
   * */
  emptyLineBetween?: boolean;
  /** Will add warns before the content, between each content line, and after the content. */
  addWarnBetweenLines?: boolean;
  warnText?: string;
};

// Split this?
function populateTags(fileContent: string, prop: string, content: string, options: PopulateTagsOptions = {}): string {

  const opts: Required<PopulateTagsOptions> = {
    ...{
      addWarnBetweenLines: true,
      emptyLineBetween: true,
      warnText: warnTextDefault,
    }, ...options ?? {},
  };

  /** Includes newline at the end. */
  const warnText = `${opts.warnText.trim()}\n`;

  const escapedProp = prop;
  const openTagRegexed = `${tagOpenerStart}\\s*${escapedProp}\\s*${tagEnd}`;
  const closeTagRegexed = `${tagCloserStart}\\s*${escapedProp}\\s*${tagEnd}`;

  // Start with a final new line.
  // TODO content changing should be outside this function!
  let contentToBeAdded = `${content.trim()}\n`;

  if (opts.addWarnBetweenLines) {
    // Add warn after all newlines
    contentToBeAdded = contentToBeAdded.replace(/(?<=\n)/g, warnText);
    // Add warn before the content
    contentToBeAdded = warnText + contentToBeAdded;
  }
  if (opts.emptyLineBetween)
    // 2 newlines before and 1 after, as after we already have 1.
    contentToBeAdded = `\n\n${contentToBeAdded}\n`;

  // Hardcode this later when project is more solidified.
  const regex = new RegExp(`(?<=${openTagRegexed}).*(?=${closeTagRegexed})`, 'sg'); // https://www.codeguage.com/courses/regexp/flags

  // console.log(regex) // Output ex: /(?<=<!--\$\s*shadowProperties\s*-->).*(?=<!--\/\$\s*shadowProperties\s*-->)/sg

  const result = fileContent.replace(regex, contentToBeAdded);

  return result;
}
