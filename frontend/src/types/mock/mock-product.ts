import type { ProductImage } from "../products"

export interface MockProduct {
  id: number
  name: string
  slug: string

  categoryId: number

  price: number
  discountPrice: number | null

  tagline: string

  shortDescription: string
  description: string

  details: string[]

  specs: {
    bulbType: string
    bulbsIncluded: string
    bulbCount: string
    dimmable: boolean
    powerCordLength: string
    weight: string
  }

  images: ProductImage[]

  isFeatured: boolean
  isNew: boolean

  stockQuantity: number

  modelCode: string
  sku: string

  status: "live" | "draft" | "archived" | "coming_soon" | "out_of_stock"

  reviewsMeta: {
    count: number
    averageRating: number
    recommendationPercentage: number

    distributions: {
      star: number
      count: number
    }[]
  }
}
