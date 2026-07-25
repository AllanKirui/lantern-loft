// Acts like Laravel's Database Layer
// Uses fetch() to load data from the static database tables in `public/mock-data/*.json` and caches them

import type { MockProduct } from "@/types/mock/mock-product"
import type { MockCategory } from "@/types/mock/mock-category"
import type { MockReview } from "@/types/mock/mock-review"

let productsCache: MockProduct[] | null = null
let categoriesCache: MockCategory[] | null = null
let reviewsCache: MockReview[] | null = null

async function loadJson<T>(path: string): Promise<T> {
  const res = await fetch(path)

  if (!res.ok) {
    throw new Error(`Failed to load ${path}`)
  }

  return res.json()
}

export async function loadProducts() {
  if (productsCache) return productsCache

  productsCache = await loadJson<MockProduct[]>(
    `${import.meta.env.BASE_URL}mock-data/products.json`
  )

  return productsCache
}

export async function loadCategories() {
  if (categoriesCache) return categoriesCache

  categoriesCache = await loadJson<MockCategory[]>(
    `${import.meta.env.BASE_URL}mock-data/categories.json`
  )

  return categoriesCache
}

export async function loadReviews() {
  if (reviewsCache) return reviewsCache

  reviewsCache = await loadJson<MockReview[]>(
    `${import.meta.env.BASE_URL}mock-data/reviews.json`
  )

  return reviewsCache
}
