export function sanitiseAnswer(answer: string) {
  let baseAnswer = answer.toLowerCase();
  let idxZeroChar = answer.slice(0, 1);
  let capitalisedIdxZero = idxZeroChar.toUpperCase();
  return capitalisedIdxZero.concat(baseAnswer.slice(1));
}
