// not ready yet!

// https://github.com/SrBrahma/mdol

module.exports = {
  /** Executed sequentially before the compilation. Array of strings and/or functions.
  Functions are awaited. */
  prepare: [
  ],
  /** README.md and CHANGELOG.md are compiled by default. */
  files: [
  ],
  /** Executed sequentially and just **once** on `mdol -w/--watch` start. Array of strings and/or functions.
  Functions are awaited. */
  watchPrepare: [
  ],
  /** chokidar pattern for files watching. On -w/--watch, it will run again if those
   * files are changed.
   * https://github.com/paulmillr/chokidar */
  watchList: [
  ],
  /** User defined convertions that will be made.
   * For now, only strings are accepted as the replacer. Later may accept functions. */
  dict: {
  }
}