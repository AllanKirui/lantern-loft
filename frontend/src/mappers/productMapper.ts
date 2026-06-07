// Acts like Laravel Resources, transforming data from the tables into shaped responses

import type { MockCategory } from "@/types/mock/mock-category"
import type { MockProduct } from "@/types/mock/mock-product"
import type { MockReview } from "@/types/mock/mock-review"

import type {
  Product,
  ProductCardBase,
  ProductCardExtended
} from "@/types/products"

// Mirrors what `backend/app/Http/Resources/Product/Concerns/ResolvesProductCard.php` does
function primaryImage(product: MockProduct) {
  const image = product.images.find((img) => img.isPrimary) ?? product.images[0]

  if (!image) return null

  return {
    url: image.medium,
    alt: image.alt
  }
}

// Mirrors what `backend/app/Http/Resources/Product/ProductCardBaseResource.php` does
export function mapProductCardBase(product: MockProduct): ProductCardBase {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    image: primaryImage(product)
  }
}

// Mirrors what `backend/app/Http/Resources/Product/ProductCardExtendedResource.php` does
export function mapProductCardExtended(
  product: MockProduct,
  category: MockCategory,
  finishesCount = 0
): ProductCardExtended {
  return {
    ...mapProductCardBase(product),

    category: {
      id: category.id,
      name: category.name,
      slug: category.slug
    },

    price: product.price,

    discountPrice: product.discountPrice,

    tagline: product.tagline,

    isNew: product.isNew,

    rating: product.reviewsMeta.averageRating,

    reviewCount: product.reviewsMeta.count,

    finishesCount
  }
}

// Mirrors what `backend/app/Http/Resources/Product/ProductDetailResource.php` does
export function mapProductDetail(
  product: MockProduct,
  reviews: MockReview[]
): Product {
  return {
    id: product.id,

    name: product.name,

    slug: product.slug,

    tagline: product.tagline,

    price: product.price,

    discountPrice: product.discountPrice,

    description: product.description,

    isNew: product.isNew,

    modelCode: product.modelCode,

    sku: product.sku,

    details: product.details,

    specs: product.specs,

    reviews: {
      items: reviews,
      meta: product.reviewsMeta
    }
  }
}
