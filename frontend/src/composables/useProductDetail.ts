import { ref, computed } from "vue"

export function useProductDetail<T>(fetcher: (slug: string) => Promise<T>) {
  const unsafeProduct = ref<T | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const product = computed(() => unsafeProduct.value as T)

  async function load(slug: string) {
    try {
      isLoading.value = true
      error.value = null

      unsafeProduct.value = await fetcher(slug)
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return { product, isLoading, error, load }
}
