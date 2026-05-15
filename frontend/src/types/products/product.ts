// Mirrors what's returned by ProductDetailResource.php

import type { ReviewItem } from "../reviews/review-item"
import type { ReviewsMeta } from "../reviews/reviews-meta"

export interface Product {
  id: number
  name: string
  slug: string
  tagline: string
  price: number
  discountPrice: number | null
  description: string
  isNew: boolean
  modelCode: string
  sku: string
  details: string[]
  specs: {
    bulbType: string
    bulbsIncluded: string
    bulbCount: string
    dimmable: boolean
    powerCordLength: string
    weight: string
  }
  reviews: {
    items: ReviewItem[]
    meta: ReviewsMeta
  }
}
