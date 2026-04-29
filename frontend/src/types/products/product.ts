// Mirrors what's returned by ProductDetailResource.php
export interface Product {
  id: number
  name: string
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
    items: {
      id: number
      rating: number
      reviewTitle: string | null
      comment: string
      authorName: string
      recommends: boolean
      isVerified: boolean
    }[]
    count: number
    averageRating: number
  }
}
