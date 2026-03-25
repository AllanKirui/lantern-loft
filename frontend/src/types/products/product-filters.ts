// Mirrors the JSON response returned by ProductController's filters() method
export type categories = { name: string; slug: string }[]

export interface ProductFilters {
  categories: categories
}
