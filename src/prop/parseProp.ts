import { getScript } from '../scripts/scripts';
import { segmentsFromProp, SegmentWithArgs } from './segmentsFromProp';
import JSON5 from 'json5';


/** Returns the corresponding content for the given prop. */
export async function parseProp(prop: string, { dict }: {dict: Dict}): Promise<string> {


  // May throw error.
  const segments = segmentsFromProp(prop);
  // Could just keep increasing until . is found, or if ( is found, kee)

  let currentValue: any;
  let previousSegment: SegmentWithArgs;

  for (const [index, segment] of segments.entries()) {
    const [segmentName, segmentArg] = segment;

    // If first segment, load script or dict value
    if (index === 0) {
      // If is a plugin
      if (segmentName[0] === '@') {
        const scriptName = segmentName.substr(1);
        currentValue = getScript(scriptName);
      } else { // Else is a dict
        currentValue = dict[segmentName];
      }
    } else { // Else, if not first segment, nest from the object before.
      if (typeof currentValue !== 'object')
        throw new Error(`Tried to nest a non-object segment in the prop! value=${currentValue}, segmentOfThisValue=${previousSegment!}`);
      currentValue = currentValue[segmentName];
    }

    // For all segments:
    if (segmentArg !== undefined && typeof currentValue !== 'function')
      throw new Error(`Tried to call a non function! prop='${prop}'`);

    // Always call a function, even if it's without (). If so, will call it with empty args. Good for
    // a more advanced and dynamic access, and backward compability, if prop turned to be a function.
    if (typeof currentValue === 'function') {
      // Function(`return currentValue${functionPart}`); would be somewhat a security concern, so I created parseArgs and segmentFromProp
      currentValue = currentValue(...segmentArg ?? []);
    }

    previousSegment = segment;
  } // End of for

  if (typeof currentValue === 'function')
    throw new Error(`Prop value is a function! Did you forget to call it? prop='${prop}'`);

  if (typeof currentValue !== 'string')
    throw new Error(`Prop value is not a string! value=${JSON5.stringify(currentValue)}, type=${typeof currentValue}`);

  return currentValue;
}
