export function sanitiseAnswer(answer: string) {
  const trimmed = answer.trim();
  if (!trimmed) return "";
  let baseAnswer = trimmed.toLowerCase();
  let idxZeroChar = trimmed.slice(0, 1);
  let capitalisedIdxZero = idxZeroChar.toUpperCase();
  return capitalisedIdxZero.concat(baseAnswer.slice(1));
}
