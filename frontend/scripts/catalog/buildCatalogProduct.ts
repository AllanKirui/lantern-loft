import { tableLampTaglines } from "./content/table-lamp-taglines"
import { tableLampDetails } from "./content/table-lamp-details"

import { floorLampTaglines } from "./content/floor-lamp-taglines"
import { floorLampDetails } from "./content/floor-lamp-details"

import {
  tableLampDescriptions,
  tableLampShortDescriptions
} from "./content/table-lamp-descriptions"

import {
  floorLampDescriptions,
  floorLampShortDescriptions
} from "./content/floor-lamp-descriptions"

import type { CatalogProduct } from "./types"

// Helpers
function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function sample<T>(items: T[], count: number): T[] {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count)
}

export function buildTableLampProduct(
  name: string
): Omit<CatalogProduct, "categorySlug"> {
  return {
    name,

    tagline: pick(tableLampTaglines),

    shortDescription: pick(tableLampShortDescriptions),

    description: pick(tableLampDescriptions),

    details: sample(tableLampDetails, random(4, 7)),

    specs: {
      bulbType: pick(["E26", "E27"]),
      bulbsIncluded: Math.random() > 0.5 ? "Yes" : "No",
      bulbCount: String(random(1, 3)),
      dimmable: Math.random() > 0.4,
      powerCordLength: `${random(150, 250)} cm`,
      weight: `${(Math.random() * 2 + 1).toFixed(1)} kg`
    },

    basePrice: random(3000, 12000),

    discountPercentage: Math.random() < 0.4 ? random(10, 25) : undefined,

    featured: Math.random() < 0.3,

    isNew: Math.random() < 0.4
  }
}

export function buildFloorLampProduct(
  name: string
): Omit<CatalogProduct, "categorySlug"> {
  return {
    name,

    tagline: pick(floorLampTaglines),

    shortDescription: pick(floorLampShortDescriptions),

    description: pick(floorLampDescriptions),

    details: sample(floorLampDetails, random(5, 8)),

    specs: {
      bulbType: pick(["E26", "E27"]),
      bulbsIncluded: Math.random() > 0.5 ? "Yes" : "No",
      bulbCount: String(random(1, 4)),
      dimmable: Math.random() > 0.3,
      powerCordLength: `${random(180, 320)} cm`,
      weight: `${(Math.random() * 5 + 3).toFixed(1)} kg`
    },

    basePrice: random(5000, 18000),

    discountPercentage: Math.random() < 0.4 ? random(10, 25) : undefined,

    featured: Math.random() < 0.3,

    isNew: Math.random() < 0.4
  }
}
