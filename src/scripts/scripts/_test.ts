export default {
  /** 'test' */
  string: 'test',
  /** Returns 'test' if no argument,
   * else return the given string. */
  function: (arg?: string): string => arg ?? 'test',
};