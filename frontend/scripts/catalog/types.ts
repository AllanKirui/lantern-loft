// Represents handcrafted catalog entries
export interface CatalogProduct {
  name: string
  categorySlug: "table-lamps" | "floor-lamps"

  tagline: string

  description: string

  shortDescription: string

  details: string[]

  specs: {
    bulbType: string
    bulbsIncluded: string
    bulbCount: string
    dimmable: boolean
    powerCordLength: string
    weight: string
  }

  basePrice: number

  discountPercentage?: number

  featured?: boolean

  isNew?: boolean
}

export interface CatalogProductSeed {
  name: string
  categorySlug: "table-lamps" | "floor-lamps"
}
