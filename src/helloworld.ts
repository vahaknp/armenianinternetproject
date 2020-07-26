import { englishToArmenianBasic } from './letter_maps/english_to_armenian_basic';

export function basicArmenianTransform(toTransform: string) {
  return englishToArmenianBasic[toTransform];
}