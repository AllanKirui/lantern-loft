import { ref } from "vue"
import { useModalStore } from "@/stores/modal"

type Image = { src: string; alt: string }

export function useImageViewer() {
  const modalStore = useModalStore()

  const images = ref<Image[]>([])
  const currentIndex = ref(0)

  function open(imgs: Image[], index = 0) {
    images.value = imgs
    currentIndex.value = index
    modalStore.open("imageViewer")
  }

  function close() {
    modalStore.close()
  }

  return {
    images,
    currentIndex,
    open,
    close
  }
}
