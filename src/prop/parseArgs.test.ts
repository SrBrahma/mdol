import { parseArgs } from './parseArgs';

it('Single arg', () => {
  expect(parseArgs('4')).toStrictEqual([4]);
  expect(parseArgs('"a"')).toStrictEqual(['a']);
  expect(parseArgs('true')).toStrictEqual([true]);
  expect(parseArgs('null')).toStrictEqual([null]);
  expect(parseArgs('{a: 7}')).toStrictEqual([{ a: 7 }]);
});

it('Multi args', () => {
  expect(parseArgs('4, "b", {a: 10, b: null, c: true, d: "d"}')).toStrictEqual([
    4, 'b', {
      a: 10, b: null, c: true, d: 'd',
    },
  ]);
});