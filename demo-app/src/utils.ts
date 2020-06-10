export const nanToBlank = (x: number) => {

  if (isNaN(x)) {
    return '';
  } else {
    return x;
  }

};

export const blankToNaN = (x: string) => {

  if (x.length === 0) {
    return NaN;
  } else {
    return Number(x);
  }

}