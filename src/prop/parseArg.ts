import JSON5 from 'json5';

type Arg = (string | undefined)
type Args = Arg[];

const stringChars = ["'", '"', '`'] as const;
type StringChars = (typeof stringChars)[number]



enum Jump {
  endCurrent,

}
/** From '"a"', return ["a"].
 *
 * TODO implement multiple args support.
 * TODO escape support. */
export function getArgsFromString(string: string): Args {
  const args: Args = [];

  let writingArgString: false | {char: StringChars} = false as any;
  // let isEscaped = false;
  let newArg: string | undefined = undefined;

  // TODO allow current type nesting. Add newValue to be use instead of newArg (?).

  function forEachChar(char: string, index: number): void {

    /** Call it with return. */
    function jump(type?: Jump) {
      if (type === Jump.endCurrent) {
        args.push(newArg);
        newArg = undefined;
      }
    }

    if (stringChars.includes(char as any)) {
      // if (!isEscaped) {
      // }
      if (!writingArgString) {
        writingArgString = { char: char as StringChars };
        return jump();
      } else if (char === writingArgString.char) {
        return jump(Jump.endCurrent);
      }
    }

    if (writingArgString) {
      newArg += char;
    } else {
      throw new Error(`Unexpected char found! char=${char}, index=${index}`);
    }

  } // End of forEachChar


  for (let i = 0; i < string.length; i++) {
    const char = string[i]!;
    forEachChar(char, i);
  }

  return args;
}


console.log(getArgsFromString('"aaa"'));
