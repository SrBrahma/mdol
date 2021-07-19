// TODO add chalk

import { Args, parseArgs } from './parseArgs';

const validFirstChars = '[@a-zA-Z]';
/** Doesn't include '.', as it isn't part of the segment. */
const validFollowingChars = '[a-zA-Z0-9]';

const debug = false;

/** functionArgs is undefined iff segment isn't a function. If fun(), it will be an empty array, = []*/
export type SegmentWithArgs = [name: string, functionArgs?: Args];
export type SegmentsWithArgs = SegmentWithArgs[];

/** Splits a prop, like 'aaa.bbb(true, false).ccc()' into [[aaa], [bbb, [true, false]], [ccc, undefined]]
 *
 * We parse the functionArgs here, before the nested access, so we catch the args errors
 * before accessing the nested object. Like a compilation, getting syntax errors before running. */
// TODO add whitespace between segments support.
export function segmentsFromProp(prop: string): SegmentsWithArgs {
  /** Our soon return! */
  const segments: SegmentsWithArgs = [];
  let newSegmentName = '';
  /** If read an '(', it will be set as '', as it is a function call. Reseted to undefined in end().
   * Still a string, will be JSON5 parsed in end. */
  let newFunctionArgs: string | undefined = undefined;
  /** When '(' is found, increase by one. Each ( found increments this, each ) decrements.
   * When reaches 0, means the function args are properly finished. */
  let parenthesisDelta = 0;

  /** Here so accessible in error() and won't have to add it in all throws. */
  let index = 0;

  function error(msg: string) {
    if (debug)
      console.error(segments);
    return `${msg}\n  At '${prop.slice(0, index + 1)}' of prop '${prop}'`;
  }

  function end() {
    if (newSegmentName === '')
      throw error('Empty segment!');
    // If prop finished and function args didn't end, throw.
    if (newFunctionArgs !== undefined && parenthesisDelta !== 0)
      throw error(`Function arg definition not finished! Args='${newFunctionArgs}'.`);

    let args;
    try {
      args = newFunctionArgs !== undefined ? parseArgs(newFunctionArgs) : undefined;
    } catch (err) {
      throw error(`${err.message as string}. Arguments='${newFunctionArgs}'`);
    }

    segments.push(args === undefined ? [newSegmentName] : [newSegmentName, args]);
    newSegmentName = ''; // reset for next
    newFunctionArgs = undefined; // Not a function until '(' is found.
  }

  for (const char of prop) {
    const isFirstSegmentChar = !newSegmentName.length;

    if (newFunctionArgs === undefined) {
      console.log(2, char);
      if (char === '.') {
        end(); // In end will be checked for segment emptyness.
      } else if (char === '(') {
        if (isFirstSegmentChar)
          throw error('No function to be called!');
        newFunctionArgs = '';
        parenthesisDelta++;
      } else {
        if (isFirstSegmentChar) {
          if (!char.match(validFirstChars))
            throw error('Invalid first char.');
        } else {
          if (!char.match(validFollowingChars))
            throw error('Invalid char.');
        }
        newSegmentName += char;
      }
    } else { // Else, is function call.
      console.log(4, parenthesisDelta, char);
      if (char === '(') {
        parenthesisDelta++;
      } else if (char === ')') {
        parenthesisDelta--;
      }
      if (parenthesisDelta === 0) {
        if (char === '.')
          end();
      } else { // if parenthesisDelta isn't 0, if still defining the function.
        newFunctionArgs += char;
      }
    }

    index++;
  }  // For end

  // End if chars ended and there is still a not ended segment.
  // end() checks for function completeness.
  if (newSegmentName)
    end();

  return segments;
}