// Mirrors the JSON response returned by ProductController's filters() method
export type categories = { name: string; slug: string }[]
export type priceRanges = { min: number; max: number }

export interface ProductFilters {
  categories: categories
  price: priceRanges
}
