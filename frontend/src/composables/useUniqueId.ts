let idCounter = 0

export function useUniqueId(prefix = "id") {
  idCounter++
  return `${prefix}-${idCounter}`
}