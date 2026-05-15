export interface ReviewItem {
  id: number
  rating: number
  reviewTitle: string | null
  comment: string
  authorName: string
  recommends: boolean
  isVerified: boolean
  expanded: boolean
}
