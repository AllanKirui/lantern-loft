// Utility humanizes keys of objects e.g
// bulb_type -> Bulb Type
// powerCordLength -> Power Cord Length

export function humanizeKey(k: string) {
  return k
    .replace(/_/g, " ") // replace underscores with a space
    .replace(/([A-Z])/g, " $1") // add a space to camelCased strings
    .replace(/\b\w/g, (c) => c.toUpperCase()) // uppercase the first character for each word
    .trim()
}
