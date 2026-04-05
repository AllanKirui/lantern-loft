import { ref } from "vue"
import { useRoute } from "vue-router"
import { productService } from "@/services/productService"
import { roundDown, roundUp } from "@/utils/price"
import type { ProductFilters } from "@/types/products/product-filters"

export function useFiltersMeta() {
  const route = useRoute()

  const meta = ref<ProductFilters | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const roundedMin = ref(0)
  const roundedMax = ref(0)
  const sliderStep = ref(100)

  // check for stored filters meta when the composable initializes
  const stored = localStorage.getItem("filtersMeta")
  if (stored) {
    let meta = JSON.parse(stored)
    roundedMin.value = meta.price.min
    roundedMax.value = meta.price.max
  }

  async function loadFilters() {
    if (route.name !== "collections") return

    try {
      isLoading.value = true
      error.value = null

      const res = await productService.fetchFilters()
      meta.value = res

      const min = Number(res.price.min)
      const max = Number(res.price.max)

      const range = max - min

      // get dynamic step value for range sliders
      sliderStep.value = range < 5000 ? 100 : range < 20000 ? 200 : 500

      // beautify the min and max values for the price range sliders
      roundedMin.value = roundDown(min, sliderStep.value)
      roundedMax.value = roundUp(max, sliderStep.value)

      // store rounded min-max prices
      localStorage.setItem(
        "filtersMeta",
        JSON.stringify({
          price: { min: roundedMin.value, max: roundedMax.value }
        })
      )
    } catch (err) {
      error.value = "Failed to load filters"
    } finally {
      isLoading.value = false
    }
  }

  return {
    meta,
    isLoading,
    error,
    roundedMin,
    roundedMax,
    sliderStep,
    loadFilters
  }
}
