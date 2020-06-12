import { blankToNaN, nanToBlank } from './utils';

describe('test nan conversion', () => {

  test('blank to nan', () => {

    const result = blankToNaN('');

    expect(result).toBeNaN();

  });

  test('number string to number', () => {

    const result = blankToNaN('12');

    expect(result).toEqual(12);

  });

  test('test string to nan', () => {

    const result = blankToNaN('xxx');

    expect(result).toBeNaN();

  });

  test('nan to blank', () => {

    const result = nanToBlank(NaN);

    expect(result).toEqual('');

  });

  test('number to number string', () => {

    const result = nanToBlank(20);

    expect(result).toEqual('20');

  });

});