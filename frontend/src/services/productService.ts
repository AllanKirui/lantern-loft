import apiClient from "./api"
import type {
  LaravelApiResponse,
  LaravelPaginatedResponse
} from "@/types/api/laravel"
import type { ProductCardBase } from "@/types/products/product-card-base"
import type { ProductCardExtended } from "@/types/products/product-card-extended"

export const productService = {
  async fetchAll(page = 1) {
    const res = await apiClient.get<
      LaravelPaginatedResponse<ProductCardExtended>
    >(`/products?page=${page}`)

    return res.data
  },

  async fetchNewArrivals() {
    const res = await apiClient.get<LaravelApiResponse<ProductCardBase>>(
      "/products/new-arrivals"
    )
    return res.data.data
  },

  async fetchFeatured() {
    const res = await apiClient.get<LaravelApiResponse<ProductCardExtended>>(
      "/products/featured"
    )
    return res.data.data
  }
}
