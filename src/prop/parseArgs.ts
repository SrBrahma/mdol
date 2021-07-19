import JSON5 from 'json5';

export type Args = any[];


/** From '4, "a", {b: 7}', return ['a', 4, {b: 7}]. */
export function parseArgs(string: string): Args {
  /** After hours writing manually a parser, had this JSON5 idea 😅
   * JSON5 mainly for objects without quotes in keys,
   * wrapped in [] to allow the ',' in the root. */
  return JSON5.parse(`[${string}]`);
}
// console.log(getArgsFromString('"aaa", 5, {a: 10, b: "ok", c: true}'));
