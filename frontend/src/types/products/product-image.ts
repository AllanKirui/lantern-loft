export interface ProductImage {
  png: {
    large: string
    medium: string
    thumb: string
    lqip: string
  }
  webp: {
    large: string
    medium: string
    thumb: string
    lqip: string
  }
  alt: string
  isPrimary: boolean
  order: number
}
