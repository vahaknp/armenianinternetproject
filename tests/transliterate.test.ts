import { basicArmenianTransform } from '../src/transliterate';

test('transliterate singles', () => {
  expect(basicArmenianTransform('a')).toBe('ա');
  expect(basicArmenianTransform('aaa')).toBe('աաա');
  expect(basicArmenianTransform('abc')).toBe('ապգ');
  expect(basicArmenianTransform('a b c')).toBe('ա պ գ');
});

test('transliterate doubles', () => {
  expect(basicArmenianTransform('sh')).toBe('շ');
  expect(basicArmenianTransform('shsh')).toBe('շշ');
  expect(basicArmenianTransform('shchdz')).toBe('շչծ');
  expect(basicArmenianTransform('sh ch dz')).toBe('շ չ ծ');
});

test('transliterate triples', () => {
  expect(basicArmenianTransform('yev')).toBe('և');
  expect(basicArmenianTransform('yevyev')).toBe('ևև');
});

test('transliterate triples, doubles and singles', () => {
  expect(basicArmenianTransform('sha')).toBe('շա');
  expect(basicArmenianTransform('chasha')).toBe('չաշա');
  expect(basicArmenianTransform('shachadza')).toBe('շաչածա');
  expect(basicArmenianTransform('sha cha dza')).toBe('շա չա ծա');
  expect(basicArmenianTransform('s ha c ha d za')).toBe('ս հա գ հա տ զա');
  expect(basicArmenianTransform('yev shachadza')).toBe('և շաչածա');
  expect(basicArmenianTransform('yevshachadza')).toBe('ևշաչածա');
});