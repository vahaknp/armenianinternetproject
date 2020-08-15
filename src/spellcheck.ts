const nspell = require('nspell');
const hywDic = require('buffer-loader!./hyw.txt');
const hywAff = require('buffer-loader!./hywaff.txt');
const hyw = require('dictionary-hyw');
const hywDicString = require('!raw-loader!./hyw.txt');
const hywAffString = require('!raw-loader!./hywaff.txt');
const BrowserFS = require('browserfs');
const path = require('path');
const Nodehun = require('nodehun');

console.log('----', Nodehun);

console.log('bfs', BrowserFS);

BrowserFS.configure(
  {
    fs: 'LocalStorage',
  },
  function (e) {
    if (e) {
      // An error happened!
      throw e;
    }
    // Otherwise, BrowserFS is ready-to-use!
  }
);

const Spellchecker = require('hunspell-spellchecker');
const spellchecker = new Spellchecker();

const bufferHywDic = Buffer.from(hywDicString.default, 'utf8');
const bufferHywAff = Buffer.from(hywAffString.default, 'utf8');

const dict = spellchecker.parse({
  aff: bufferHywDic,
  dic: bufferHywAff,
});

console.log('dic', dict);

spellchecker.use(dict);

const nodehun = new Nodehun(bufferHywAff, bufferHywDic);

// console.log('array', hywDic);
// console.log('string:', hywDicString.default);
// console.log('buffer from string', new Buffer(hywDicString.default));
// const spell = nspell(bufferHywAff, bufferHywDic);

export async function spellcheck(word: string): Promise<string[]> {
  console.log('---', word);
  const isRight = spellchecker.check(word);
  const suggest = spellchecker.suggest(word);
  console.log('!!!', isRight);
  console.log('???', suggest);
  const suggestions = await nodehun.suggest(word);
  console.log('!!', suggestions);
  // console.log(nspell);
  // console.log(spell);
  // const test = spell.correct(word);
  // console.log('test!', test);
  // const test2 = spell.suggest(word);
  // console.log('test!', test2);
  return [];
}
