import { getScript } from '../scripts/scripts';





const segmentRegex = (() => {
  const firstChar = '[@a-zA-Z]';
  const followingChars = '[a-zA-Z0-9]';
  // Only supporting strings for now.
  // source returns the string of the regex. Cleaner to use regex here.
  const string = /(?:".*")|(?:'.*')/.source; // 'a' or "a".
  const func = `(?:\\((\\s*${string}?\\s*)\\))`; // Captures the args, as single string.
  return new RegExp(`^(${firstChar}${followingChars}*)${func}?$`);
})();


// Run this file with ts-node-dev to validate/test the function above
// console.log('aaa("4")'.match(segmentRegex));



/** Returns the corresponding content for the given prop. */
export async function parseProp(prop: string, { dict }: {dict: Dict}): Promise<string> {

  const segments = prop.split('.'); // TODO will be problematic with args containing '.'.
  let isFirst = true;
  let currentValue: any;

  let previousSegment: string | undefined = undefined;
  for (const segment of segments) {

    const match = segment.match(segmentRegex);

    if (!match)
      throw new Error(`Invalid segment! segment=${segment}, prop=${prop}, segmentRegex=${segmentRegex}`);

    const segmentName = match[1]!;
    const functionArgsAsString: string | undefined = match[2];
    const isFunction = functionArgsAsString !== undefined; // '' is a valid function args. checking for undefined.


    // Get current value
    // If first segment, load script, dict value...
    if (isFirst) {
      // If is a plugin
      if (segmentName[0] === '@') {
        const scriptName = segmentName.substr(1);
        currentValue = getScript(scriptName);
      }
      // Else is a dict
      else {
        currentValue = dict[segmentName];
      }
      isFirst = false;
    } else { // Else, if not first segment, nest from the object before.
      if (typeof currentValue !== 'object')
        throw new Error(`Tried to nest a non-object segment in the prop! value=${currentValue}, segmentOfThisValue=${previousSegment!}, prop=${prop}`);
      // TODO object check
    }

    if (isFunction) {
      // Using Function would be somewhat a security concern.
      // currentValue = Function(`return currentValue${functionPart}`);
      currentValue;
    }

    // if (!isFunction) {
    //   // if (!curretSegment?.match(/[a-zA-Z@][a-zA-Z]/) filter?
    // }
    previousSegment = segment;
  }

  if (typeof currentValue !== 'function')
    throw new Error(`Prop value is a function! prop=${prop}, value=${currentValue}`);

  if (typeof currentValue !== 'string')
    throw new Error(`Prop value isn't a string! prop=${prop}, value=${currentValue}`);

  return currentValue;
}

type Dict = Record<string, any>