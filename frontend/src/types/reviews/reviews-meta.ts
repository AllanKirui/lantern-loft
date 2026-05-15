export interface ReviewsMeta {
  count: number
  averageRating: number
  recommendationPercentage: number
  distributions: {
    star: number
    count: number
  }[]
}
