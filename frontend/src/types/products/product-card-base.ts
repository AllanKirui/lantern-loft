// Mirrors what's returned by ProductCardBaseResource.php
export interface ProductCardBase {
  id: number
  name: string
  slug: string
  shortDescription: string
  image: {
    url: string
    alt: string
  } | null
}
