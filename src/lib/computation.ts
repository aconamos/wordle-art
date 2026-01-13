/**
 * zips two arrays
 * zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */
function zip<T>(a: Array<T>, b: Array<T>) {
  const len = Math.min(a.length, b.length)
  return Array.from({ length: len }, (_, i) => [a[i], b[i]])
}

/**
 * removes first thing by value if found, otherwise nothing
 */
function removeByValue<T>(arr: Array<T>, val: T) {
  const idx = arr.findIndex((item) => item === val)

  if (idx !== -1) {
    arr.splice(idx, 1)
  }
}

/**
 * cartesian product like itertools.product
 */
export function product<T>(...arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>((acc, curr) => acc.flatMap((a) => curr.map((b) => [...a, b])), [[]])
}

/**
 * Turns a word into a series of InfoSquares against a given word.
 * UB if arrays are different length
 *
 * @param given_word
 * @param target_word
 */
export function getPatternMask(given_word: string, target_word: string): string {
  const given_letters = [...given_word]
  const target_letters = [...target_word]
  let green_mask = ''
  let yellow_mask = ''

  // green loop
  for (const [target, given] of zip(target_letters, given_letters)) {
    if (given === target) {
      green_mask += 'x'
      removeByValue(target_letters, given)
    } else {
      green_mask += '.'
    }
  }

  // yellow loop
  for (const letter of given_letters) {
    if (target_letters.includes(letter)) {
      yellow_mask += 'y'
      removeByValue(target_letters, letter)
    } else {
      yellow_mask += '.'
    }
  }

  let mask = ''

  for (let i = 0; i < 5; i++) {
    if (green_mask[i] === 'x') {
      mask += 'x'
    } else if (yellow_mask[i] === 'y') {
      mask += 'y'
    } else {
      mask += '.'
    }
  }

  return mask
}
