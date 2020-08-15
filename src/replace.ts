import * as _ from 'lodash';
import { basicArmenianTransform } from './transliterate';
import { spellcheck } from './spellcheck';

export function shouldReplacePreviousWord(keyEvent: KeyboardEvent) {
  console.log('Key event:', keyEvent);
  const { code, key } = keyEvent;
  if (key !== ' ' && key !== 'Enter' && code !== 'Enter' && code !== 'Space') return false;
  return true;
}

export function replacePrevWord(): void {
  const activeElement = <HTMLInputElement>document.activeElement;
  console.log('text:', activeElement.value);
  const lastWord = getLastWord(activeElement);
  const newText = getReplacementText(activeElement.value, lastWord);
  console.log('should replace', activeElement.value, 'with', newText);
  activeElement.value = newText;
}

export function getLastWord(activeElement: HTMLInputElement): string {
  const words = _.words(activeElement.value);
  const caretPosition = activeElement.selectionStart;
  const lastWord = _.last(words);
  console.log('caret position:', caretPosition);
  console.log('words:', words);
  console.log('last word', lastWord);
  return lastWord;
}

export function getReplacementText(originalText: string, lastWord: string): string {
  const replacementWord = basicArmenianTransform(lastWord);

  spellcheck(replacementWord);

  const newText = originalText.replace(lastWord, replacementWord);
  return newText;
}
