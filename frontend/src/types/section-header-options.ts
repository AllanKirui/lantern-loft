export interface SectionHeaderOptions {
  tagline: string
  headingId: string
  title?: string
  subtitle?: string
  link?: {
    to: string
    text: string
  }
  productType?: "new" | "featured" | "recommended"
  withNavigation?: boolean
}
