export function sanitiseAnswer(answer: string) {
  const trimmed = answer.trim();
  if (!trimmed) return "";
  const baseAnswer = trimmed.toLowerCase();
  const idxZeroChar = trimmed.slice(0, 1);
  const capitalisedIdxZero = idxZeroChar.toUpperCase();
  return capitalisedIdxZero.concat(baseAnswer.slice(1));
}
