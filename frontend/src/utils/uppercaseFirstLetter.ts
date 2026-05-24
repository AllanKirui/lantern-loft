// Utility uppercases only the first letter in a string e.g
//   hello world -> Hello world

export function uppercaseFirstLetter(word: string | null) {
  if (!word) return

  return word.charAt(0).toUpperCase() + word.slice(1)
}
