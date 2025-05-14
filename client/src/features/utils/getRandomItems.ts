// eslint-disable-next-line import/prefer-default-export
export function getRandomItems<T>(array: T[], count = 1): T[] {
  return [...array].sort(() => Math.random() - 0.5).slice(0, count);
}
