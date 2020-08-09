import './contentscript.scss';
import * as _ from 'lodash';
import { basicArmenianTransform } from '../transliterate';

const isThisContentscript = true;
console.log('isThisContentscript', isThisContentscript);
console.log('!!!', basicArmenianTransform);

(function () {
  document.onkeydown = (keyEvent) => {
    console.log('????', keyEvent);
    if (!shouldReplacePreviousWord(keyEvent)) return;
    replacePrevWord();
  };
})();

function shouldReplacePreviousWord(keyEvent: KeyboardEvent) {
  const { code, key } = keyEvent;
  if (key !== '' && key !== 'Enter' && code !== 'Enter' && code !== 'Space') return false;
  return true;
}

function replacePrevWord() {
  const activeElement = <HTMLInputElement>document.activeElement;
  console.log('text:', activeElement.value);
  const lastWord = getLastWord(activeElement);
  const newText = getReplacementText(activeElement.value, lastWord);
  console.log('should replace', activeElement.value, 'with', newText);
  activeElement.value = newText;
}

function getLastWord(activeElement: HTMLInputElement): string {
  const words = _.words(activeElement.value);
  const caretPosition = activeElement.selectionStart;
  const lastWord = _.last(words);
  console.log('caret position:', caretPosition);
  console.log('words:', words);
  console.log('last word', lastWord);
  return lastWord;
}

function getReplacementText(originalText: string, lastWord: string): string {
  const replacementWord = basicArmenianTransform(lastWord);
  const newText = originalText.replace(lastWord, replacementWord);
  return newText;
}
