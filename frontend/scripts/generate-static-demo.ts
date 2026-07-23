import { writeFile } from "fs/promises"

import { tableLamps } from "./catalog/table-lamps"
import { floorLamps } from "./catalog/floor-lamps"
import { categories } from "./catalog/categories"

import { authorNames } from "./catalog/content/author-names"
import {
  positiveReviews,
  neutralReviews,
  negativeReviews
} from "./catalog/content/review-templates"

import type { CatalogProduct } from "./catalog/types"
import type { MockProduct } from "../src/types/mock/mock-product"
import type { MockReview } from "../src/types/mock/mock-review"
import type { ProductImage } from "../src/types/products"

import {
  buildTableLampProduct,
  buildFloorLampProduct
} from "./catalog/buildCatalogProduct"

// Transform lamp definitions into catalog products
const catalog: CatalogProduct[] = [
  ...tableLamps.map((lamp) => ({
    ...buildTableLampProduct(lamp.name),
    categorySlug: lamp.categorySlug
  })),

  ...floorLamps.map((lamp) => ({
    ...buildFloorLampProduct(lamp.name),
    categorySlug: lamp.categorySlug
  }))
]

// Generates image paths
function generateImages(
  productId: number,
  categorySlug: string,
  productName: string
) {
  // Different categories have different image paths
  if (categorySlug === "floor-lamps")
    return generateFloorLampImages(productId, productName)
  else return generateTableLampImages(productId, productName)
}

function generateTableLampImages(productId: number, productName: string) {
  const basePath = `/products/${productId}`

  // structure for table lamps
  return [
    buildImage(basePath, "main", `${productName} primary image`, 1, true),
    buildImage(basePath, "detail-shade", `${productName} lampshade detail`, 2),
    buildImage(basePath, "detail-base", `${productName} base detail`, 3),
    buildImage(basePath, "dimensions", `${productName} dimensions`, 4)
  ]
}

function generateFloorLampImages(productId: number, productName: string) {
  const basePath = `/products/${productId}`

  // structure for floor lamps
  return [
    buildImage(basePath, "main", `${productName} primary image`, 1, true),
    buildImage(basePath, "detail", `${productName} lampshade detail`, 2),
    buildImage("/products/shared", "foot-switch", "Product switch image", 3)
  ]
}

function buildImage(
  productPath: string,
  filename: string,
  alt: string,
  order: number,
  isPrimary = false
): ProductImage {
  return {
    png: {
      large: `${productPath}/large/${filename}.png`,
      medium: `${productPath}/medium/${filename}.png`,
      thumb: `${productPath}/thumb/${filename}.png`,
      lqip: `${productPath}/lqip/${filename}.png`
    },
    webp: {
      large: `${productPath}/large/${filename}.webp`,
      medium: `${productPath}/medium/${filename}.webp`,
      thumb: `${productPath}/thumb/${filename}.webp`,
      lqip: `${productPath}/lqip/${filename}.webp`
    },
    alt,
    isPrimary,
    order
  }
}

let reviewId = 1

// Generate a random number of reviews for products that have reviews
function generateReviews(productId: number) {
  const reviewCount = random(3, 12)

  // Pick a sentiment for each review
  return Array.from({ length: reviewCount }, (_, index) => {
    const positive = Math.random() < 0.75 // 75% positive reviews

    // Pick a single review from the review templates
    const template = positive
      ? pick(positiveReviews)
      : Math.random() < 0.5
      ? pick(neutralReviews)
      : pick(negativeReviews)

    // Generate a rating that's positive, negative or neutral
    const rating = positive ? random(4, 5) : random(2, 3)

    // Create and return a review object
    return {
      id: reviewId++,

      productId,

      rating,

      reviewTitle: template.title,

      comment: template.comment,

      authorName: pick(authorNames),

      recommends: rating >= 4,

      isVerified: Math.random() < 0.7,

      expanded: false,

      createdAt: new Date().toISOString()
    }
  })
}

// Pre-compute aggregates
function buildReviewsMeta(reviews: MockReview[]) {
  const count = reviews.length

  const averageRating =
    count === 0
      ? 0
      : Number(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1)
        )

  const recommendationPercentage =
    count === 0
      ? 0
      : Math.round((reviews.filter((r) => r.recommends).length / count) * 100)

  return {
    count,
    averageRating,
    recommendationPercentage,

    distributions: [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => r.rating === star).length
    }))
  }
}

// Helpers
function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(items: T[]): T {
  // Return a single random item from an array
  return items[Math.floor(Math.random() * items.length)]
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

// These represent database tables
const products: MockProduct[] = [] // products.json
const reviews: MockReview[] = [] // reviews.json

catalog.forEach((entry, index) => {
  const productId = index + 1

  // Randomly decide whether a product has reviews
  const hasReviews = Math.random() > 0.1
  const productReviews: MockReview[] = hasReviews
    ? generateReviews(productId)
    : []

  // Append generated reviews to the global reviews collection
  reviews.push(...productReviews)

  // Calculate review aggregates
  const reviewsMeta = buildReviewsMeta(productReviews)

  // Append the generated full product to the global products collection
  products.push({
    id: productId,

    name: entry.name,

    slug: slugify(entry.name),

    categoryId: entry.categorySlug === "table-lamps" ? 1 : 2,

    price: entry.basePrice,

    discountPrice: entry.discountPercentage
      ? Math.round(entry.basePrice * (1 - entry.discountPercentage / 100))
      : null,

    tagline: entry.tagline,

    shortDescription: entry.shortDescription,

    description: entry.description,

    details: entry.details,

    specs: entry.specs,

    images: generateImages(productId, entry.categorySlug, entry.name),

    isFeatured: entry.featured ?? false,

    isNew: entry.isNew ?? false,

    stockQuantity: random(0, 40),

    modelCode:
      entry.categorySlug === "table-lamps"
        ? `LMP-TBL-${String(productId).padStart(3, "0")}`
        : `LMP-FLR-${String(productId).padStart(3, "0")}`,

    sku: `LMP-${String(productId).padStart(6, "0")}`,

    status: "live",

    reviewsMeta
  })
})

// Write Files - Generate the static database tables
await writeFile(
  "public/mock-data/products.json",
  JSON.stringify(products, null, 2)
)

await writeFile(
  "public/mock-data/reviews.json",
  JSON.stringify(reviews, null, 2)
)

await writeFile(
  "public/mock-data/categories.json",
  JSON.stringify(categories, null, 2)
)
