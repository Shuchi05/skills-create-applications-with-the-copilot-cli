const { calculate, parseNumber } = require('../calculator');

describe('calculator operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(calculate('add', 2, 3)).toBe(5);
    expect(calculate('+', 2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(calculate('sub', 10, 4)).toBe(6);
    expect(calculate('-', 10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(calculate('mul', 45, 2)).toBe(90);
    expect(calculate('*', 45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(calculate('div', 20, 5)).toBe(4);
    expect(calculate('/', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => calculate('div', 1, 0)).toThrow('Division by zero');
    expect(() => calculate('/', 1, 0)).toThrow('Division by zero');
  });

  test('modulo: 5 % 2 = 1', () => {
    expect(calculate('mod', 5, 2)).toBe(1);
    expect(calculate('%', 5, 2)).toBe(1);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(calculate('pow', 2, 3)).toBe(8);
    expect(calculate('^', 2, 3)).toBe(8);
  });

  test('square root: sqrt 16 = 4', () => {
    expect(calculate('sqrt', 16)).toBe(4);
  });

  test('square root of negative throws', () => {
    expect(() => calculate('sqrt', -9)).toThrow('Cannot take square root of a negative number');
  });

  test('unsupported operation throws', () => {
    expect(() => calculate('unknown', 2, 3)).toThrow(/Unsupported operation/);
  });

  test('parseNumber valid and invalid', () => {
    expect(parseNumber('3.14')).toBeCloseTo(3.14);
    expect(parseNumber('foo')).toBeNull();
    expect(parseNumber('NaN')).toBeNull();
  });
});
