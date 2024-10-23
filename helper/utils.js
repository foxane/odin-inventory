/**
 * Capitalize first letter, lowercasing the rest
 * @param {string} str String to capitalize
 * @returns Capitalized first char + lowercase rest
 */

export const capitalize = str => {
  const [a, ...b] = str;
  return a.toUpperCase() + b.join('').toLowerCase();
};
