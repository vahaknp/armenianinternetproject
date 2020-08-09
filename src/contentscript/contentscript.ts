import './contentscript.scss';
import { shouldReplacePreviousWord, replacePrevWord } from '../replace';

document.onkeydown = (keyEvent) => {
  if (!shouldReplacePreviousWord(keyEvent)) return;
  replacePrevWord();
};
