// Mirrors what's returned by ProductCardBaseResource.php

import type { ProductPreviewImage } from "./product-preview-image"

export interface ProductCardBase {
  id: number
  name: string
  slug: string
  shortDescription: string
  image: ProductPreviewImage | null
}
