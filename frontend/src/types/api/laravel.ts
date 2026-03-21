export interface LaravelApiResponse<T> {
  data: T[]
}

export interface LaravelPaginationMeta {
  currentPage: number
  from: number | null
  lastPage: number
  path: string
  perPage: number
  to: number | null
  total: number
}

export interface LaravelPaginationLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface LaravelPaginatedResponse<T> extends LaravelApiResponse<T> {
  links: LaravelPaginationLinks
  meta: LaravelPaginationMeta
}
