import { segmentsFromProp } from './segmentsFromProp';

test('single segment prop', () => {
  expect(segmentsFromProp('aaa')).toEqual([['aaa']]);
});
test('single segment function', () => {
  expect(segmentsFromProp('aaa()')).toEqual([['aaa', []]]);
});
test('nested prop', () => {
  expect(segmentsFromProp('a.b().c.d(4, true, "4", {a: 5}).e')).toEqual([['a'], ['b', []], ['c'], ['d', [4, true, '4', { a: 5 }]], ['e']]);
});