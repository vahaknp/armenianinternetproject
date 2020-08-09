import * as replace from '../src/replace';

const enterKeyEvent = new KeyboardEvent('keydown', { code: 'Enter', key: 'Enter' });
const spaceKeyEvent = new KeyboardEvent('keydown', { code: 'Space', key: ' ' });
const letterAKeyEvent = new KeyboardEvent('keydown', { code: 'KeyA', key: 'a' });
const testHTMLInputElement = new HTMLInputElement();

test('shouldReplacePreviousWord', () => {
  expect(replace.shouldReplacePreviousWord(enterKeyEvent)).toBeFalsy();
  expect(replace.shouldReplacePreviousWord(spaceKeyEvent)).toBeFalsy();
  expect(replace.shouldReplacePreviousWord(letterAKeyEvent)).toBeTruthy();
});

test('getLastWord', () => {
  testHTMLInputElement.value = 'first';
  expect(replace.getLastWord(testHTMLInputElement)).toBe('first');
  testHTMLInputElement.value = 'first second';
  expect(replace.getLastWord(testHTMLInputElement)).toBe('second');
  testHTMLInputElement.value = 'first second third';
  expect(replace.getLastWord(testHTMLInputElement)).toBe('third');
  testHTMLInputElement.value = 'first secondthird';
  expect(replace.getLastWord(testHTMLInputElement)).toBe('secondthird');
});

test('getReplacementText', () => {
  expect(replace.getReplacementText('sha', 'sha')).toBe('շա');
  expect(replace.getReplacementText('chasha', 'chasha')).toBe('չաշա');
  expect(replace.getReplacementText('shachadza', 'shachadza')).toBe('շաչածա');
  expect(replace.getReplacementText('sha cha dza', 'dza')).toBe('ծա');
  expect(replace.getReplacementText('s ha c ha d za', 'za')).toBe('զա');
  expect(replace.getReplacementText('yev shachadza', 'shachadza')).toBe('շաչածա');
  expect(replace.getReplacementText('yevshachadza', 'yevshachadza')).toBe('ևշաչածա');
});
