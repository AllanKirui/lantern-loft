// Utility capitalizes slugs and other strings e.g
//  table-lamps -> Table Lamps
//  lorem ipsum dolor sit -> Lorem Ipsum Dolor Sit

export function capitalizeWords(input: string) {
  if (!input) return ""

  return input
    .toLowerCase()
    .split(/[\s-]+/) // split on spaces OR dashes
    .filter(Boolean) // remove empty strings
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
