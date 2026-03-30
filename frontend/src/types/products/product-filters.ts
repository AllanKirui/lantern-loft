// Mirrors the JSON response returned by ProductController's filters() method
export type categories = {
  id: number
  name: string
  slug: string
  productsCount: number
}[]
export type priceRanges = { min: number; max: number }

export interface ProductFilters {
  categories: categories
  price: priceRanges
}
