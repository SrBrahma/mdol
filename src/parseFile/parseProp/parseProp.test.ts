import { parseProp } from './parseProp';

const dict = {
  a: '5',
  b: {
    a: '7',
  },
  f: () => 'k',
  g: (v: string) => v,
  h: () => ({
    a: 'p',
  }),
  i: (a: string, b: string, c: string) => a + b + c,
};



describe('Dict access', () => {

  test('single segment', () => {
    return expect(parseProp('a', { dict })).resolves.toBe('5');
  });

  test('nested segment', () => {
    return expect(parseProp('b.a', { dict })).resolves.toBe('7');
  });

  test('single segment function', () => {
    return expect(parseProp('f()', { dict })).resolves.toBe('k');
  });

  test('single segment function without parenthesis', () => {
    return expect(parseProp('f', { dict })).resolves.toBe('k');
  });

  test('function with argument', () => {
    return expect(parseProp('g("aaa")', { dict })).resolves.toBe('aaa');
  });

  test('segment after object returning function', () => {
    return expect(parseProp('h().a', { dict })).resolves.toBe('p');
  });

  test('multi arg function', () => {
    return expect(parseProp('i("1", "2", "3")', { dict })).resolves.toBe('123');
  });

  test('single segment invalid', () => {
    return expect(parseProp('dontExist', { dict })).rejects.toThrow();
  });

  test('nested segment invalid first key', () => {
    return expect(parseProp('dontExist.any', { dict })).rejects.toThrow();
  });

  test('nested segment invalid second key', () => {
    return expect(parseProp('b.dontExist', { dict })).rejects.toThrow();
  });

});


describe('Scripts test', () => {

  test('single segment string', () => {
    return expect(parseProp('@_test.string', { dict })).resolves.toBe('test');
  });

  test('single segment function', () => {
    return expect(parseProp('@_test.function()', { dict })).resolves.toBe('test');
  });

  test('single segment function with argument', () => {
    return expect(parseProp('@_test.function("x")', { dict })).resolves.toBe('x');
  });

  test('script doesn\'t exist', () => {
    return expect(parseProp('@dontExist', { dict })).rejects.toThrow();
  });
});