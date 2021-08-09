import { populateTag } from './populateTags';


const file1 = `Hi!
<!--$ prop -->
<!--/$ prop -->
Bye!`;



test('no line between', () => {
  expect(populateTag(file1, 'prop', 'test', {
    addWarnBetweenLines: false,
    emptyLineAround: false,
  })).toBe(`Hi!
<!--$ prop -->
test
<!--/$ prop -->
Bye!`);
});


test('empty line between', () => {
  expect(populateTag(file1, 'prop', 'test', {
    addWarnBetweenLines: false,
    emptyLineAround: true,
  })).toBe(`Hi!
<!--$ prop -->

test

<!--/$ prop -->
Bye!`);
});

test('warn', () => {
  const res = populateTag(file1, 'prop', 'test', {
    addWarnBetweenLines: true,
    emptyLineAround: false,
    warnText: 'be careful!',
  });
  expect(res).toBe(`Hi!
<!--$ prop -->
<!--$ !warn be careful! -->
test
<!--$ !warn be careful! -->
<!--/$ prop -->
Bye!`);
});

test('empty line between with warn', () => {
  const res = populateTag(file1, 'prop', 'test', {
    addWarnBetweenLines: true,
    emptyLineAround: true,
    warnText: 'be careful!',
  });
  expect(res).toBe(`Hi!
<!--$ prop -->

<!--$ !warn be careful! -->
test
<!--$ !warn be careful! -->

<!--/$ prop -->
Bye!`);
});

