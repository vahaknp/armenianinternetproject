const hywDicString = require('!raw-loader!./hyw.txt');
const hywAffString = require('!raw-loader!./hywaff.txt');
import { Nodehun } from 'nodehun';

const bufferHywDic = Buffer.from(hywDicString.default, 'utf8');
const bufferHywAff = Buffer.from(hywAffString.default, 'utf8');
const nodehun = new Nodehun(bufferHywAff, bufferHywDic);

export async function spellcheck(word: string): Promise<string[]> {
  const suggestions = await nodehun.suggest(word);
  return [];
}
