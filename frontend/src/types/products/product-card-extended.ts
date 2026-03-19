// Mirrors what's returned by ProductCardExtendedResource.php
import type { ProductCardBase } from "./product-card-base"

export interface ProductCardExtended extends ProductCardBase {
  category: {
    id: number
    name: string
    slug: string
  }
  price: number
  discountPrice: number | null
  tagline: string
  isNew: boolean
  rating: number
  reviewCount: number
  finishesCount: number
}
