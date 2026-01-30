// Helper to transform properties from Laravel's API response from snake_case to camelCase

function toCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function snakeToCamel<T = any>(input: any): T {
  // Handle arrays
  if (Array.isArray(input)) {
    return input.map((item) => snakeToCamel(item)) as T
  }

  // Handle objects
  if (input !== null && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const camelKey = toCamel(key)
      acc[camelKey] = snakeToCamel(input[key])
      return acc
    }, {} as any)
  }

  // Return primitives unchanged
  return input
}
