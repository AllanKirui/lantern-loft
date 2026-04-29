import { useProductDetail } from "@/composables/useProductDetail"

export type ProductDetailContext<T> = ReturnType<typeof useProductDetail<T>>
