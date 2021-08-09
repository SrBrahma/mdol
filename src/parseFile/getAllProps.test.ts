import { getPropsInFile } from './getAllProps';

const file = `Hi!
<!--$ prop1 -->
<!--/$ prop1 -->
<!--$ prop2 -->
<!--/$ prop2 -->
Bye!`;



test('works', () => {
  expect(getPropsInFile(file)).toStrictEqual(['prop1', 'prop2']);
});

