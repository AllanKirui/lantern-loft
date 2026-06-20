// Replaces Laravel API endpoints that would be in `src/services/productService.ts`

import { loadCategories, loadProducts, loadReviews } from "./dataLoader"

import {
  mapProductCardBase,
  mapProductCardExtended,
  mapProductDetail
} from "@/mappers/productMapper"

import type { LaravelPaginatedResponse } from "@/types/api/laravel"

import type {
  Product,
  ProductCardBase,
  ProductCardExtended,
  ProductFilters
} from "@/types/products"

import type { MockProduct } from "@/types/mock/mock-product"

const ENABLE_NETWORK_DELAY =
  import.meta.env.VITE_ENABLE_NETWORK_DELAY === "true"

const NETWORK_DELAY_MS = Number(import.meta.env.VITE_NETWORK_DELAY_MS ?? 750)

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function simulateNetworkDelay() {
  if (!import.meta.env.DEV) return

  if (!ENABLE_NETWORK_DELAY) return

  await sleep(NETWORK_DELAY_MS)
}

async function fetchAll(
  params: Record<string, any>
): Promise<LaravelPaginatedResponse<ProductCardExtended>> {
  await simulateNetworkDelay()

  const products = await loadProducts()
  const categories = await loadCategories()

  let results = [...products]

  // category filter
  if (params.category) {
    const category = categories.find((c) => c.slug === params.category)

    if (category) {
      results = results.filter((p) => p.categoryId === category.id)
    }
  }

  // min price
  if (params.min_price !== null && params.min_price !== undefined) {
    results = results.filter(
      (p) => (p.discountPrice ?? p.price) >= Number(params.min_price)
    )
  }

  // max price
  if (params.max_price !== null && params.max_price !== undefined) {
    results = results.filter(
      (p) => (p.discountPrice ?? p.price) <= Number(params.max_price)
    )
  }

  // rating
  if (params.rating) {
    results = results.filter(
      (p) => p.reviewsMeta.averageRating >= Number(params.rating)
    )
  }

  sortProducts(results, params.sort)

  const page = Number(params.page ?? 1)

  const perPage = Number(params.per_page ?? 12)

  const total = results.length

  const start = (page - 1) * perPage

  const paginated = results.slice(start, start + perPage)

  const data = paginated.map((product) => {
    const category = categories.find((c) => c.id === product.categoryId)!

    return mapProductCardExtended(product, category)
  })

  // return data that mirrors Laravel's paginated reposnse
  return {
    data,

    links: {
      first: null,
      last: null,
      prev: null,
      next: null
    },

    meta: {
      currentPage: page,
      from: total === 0 ? null : start + 1,
      to: total === 0 ? null : start + data.length,

      lastPage: Math.ceil(total / perPage) || 1,

      path: "/collections",

      perPage,

      total
    }
  }
}

async function fetchBySlug(slug: string): Promise<Product> {
  await simulateNetworkDelay()

  const products = await loadProducts()

  const reviews = await loadReviews()

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    throw new Error("Product not found")
  }

  const productReviews = reviews
    .filter((review) => review.productId === product.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 7)

  return mapProductDetail(product, productReviews)
}

async function fetchNewArrivals(): Promise<ProductCardBase[]> {
  await simulateNetworkDelay()

  const products = await loadProducts()

  return products
    .filter((p) => p.isNew)
    .slice(0, 6)
    .map(mapProductCardBase)
}

async function fetchFeatured(): Promise<ProductCardExtended[]> {
  await simulateNetworkDelay()

  const products = await loadProducts()

  const categories = await loadCategories()

  return products
    .filter((p) => p.isFeatured)
    .slice(0, 8)
    .map((product) => {
      const category = categories.find((c) => c.id === product.categoryId)!

      return mapProductCardExtended(product, category)
    })
}

async function fetchRecommended(slug: string): Promise<ProductCardExtended[]> {
  await simulateNetworkDelay()

  const products = await loadProducts()

  const categories = await loadCategories()

  const currentProduct = products.find((p) => p.slug === slug)

  if (!currentProduct) {
    return []
  }

  return [...products]
    .filter((p) => p.id !== currentProduct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8)
    .map((product) => {
      const category = categories.find((c) => c.id === product.categoryId)!

      return mapProductCardExtended(product, category)
    })
}

async function fetchFilters(): Promise<ProductFilters> {
  await simulateNetworkDelay()

  const products = await loadProducts()

  const categories = await loadCategories()

  const effectivePrices = products.map((p) => p.discountPrice ?? p.price)

  return {
    categories: categories.map((category) => ({
      id: category.id,

      name: category.name,

      slug: category.slug,

      productsCount: products.filter((p) => p.categoryId === category.id).length
    })),

    price: {
      min: Math.min(...effectivePrices),

      max: Math.max(...effectivePrices)
    }
  }
}

function sortProducts(products: MockProduct[], sort: string = "newest") {
  switch (sort) {
    case "price_asc":
      products.sort(
        (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
      )
      break

    case "price_desc":
      products.sort(
        (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
      )
      break

    case "alpha_asc":
      products.sort((a, b) => a.name.localeCompare(b.name))
      break

    case "alpha_desc":
      products.sort((a, b) => b.name.localeCompare(a.name))
      break

    default:
      products.sort((a, b) => b.id - a.id)
  }
}

export const productRepository = {
  fetchAll,
  fetchBySlug,
  fetchFeatured,
  fetchRecommended,
  fetchFilters,
  fetchNewArrivals
}
