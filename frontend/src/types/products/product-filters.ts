// Mirrors the JSON response returned by ProductController's filters() method
export type Categories = {
  id: number
  name: string
  slug: string
  productsCount: number
}[]

type PriceRanges = { min: number; max: number }

export interface ProductFilters {
  categories: Categories
  price: PriceRanges
}
