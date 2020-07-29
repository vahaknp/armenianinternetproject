import * as _ from 'lodash';
import * as armenianBasicMap from './letter_maps/english_to_armenian_basic';

export function basicArmenianTransform(toTransform: string): string {
  let transformed = toTransform;

  _.forEach(armenianBasicMap.englishToArmenianTriplesBasic, (replace, find) => {
    transformed = _.replace(transformed, new RegExp(find, 'g'), replace);
  });

  _.forEach(armenianBasicMap.englishToArmenianDoublesBasic, (replace, find) => {
    transformed = _.replace(transformed, new RegExp(find, 'g'), replace);
  });

  _.forEach(armenianBasicMap.englishToArmenianBasic, (replace, find) => {
    transformed = _.replace(transformed, new RegExp(find, 'g'), replace);
  });

  return transformed;
}