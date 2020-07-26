import { basicArmenianTransform } from './helloworld';

test('basic transform', () => {
  expect(basicArmenianTransform('a')).toBe('ա');
});

test('basic transform with undefined letter', () => {
  expect(basicArmenianTransform('ա')).toBe(undefined);
});