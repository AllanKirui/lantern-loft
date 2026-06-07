export interface MockReview {
  id: number

  productId: number

  rating: number

  reviewTitle: string | null

  comment: string

  authorName: string

  recommends: boolean

  isVerified: boolean

  expanded: boolean

  createdAt: string
}
