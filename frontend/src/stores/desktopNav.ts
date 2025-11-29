import { defineStore } from "pinia"
import { ref } from "vue"
import { useOverlayStore } from "./overlay"

type DropdownName = "account" | "recent" | "wishlist"

export const useDesktopNavStore = defineStore("desktopNav", () => {
  const overlayStore = useOverlayStore()
  const activeDropdown = ref<DropdownName | null>(null)
  const isAccountOpen = ref(false)
  const isRecentOpen = ref(false)
  const isWishlistOpen = ref(false)

  function toggleDropdown(menu: DropdownName) {
    const isSame = activeDropdown.value === menu
    activeDropdown.value = isSame ? null : menu
    overlayStore[isSame ? "close" : "open"]()

    isAccountOpen.value = activeDropdown.value === "account" && true
    isRecentOpen.value = activeDropdown.value === "recent" && true
    isWishlistOpen.value = activeDropdown.value === "wishlist" && true
  }

  function closeAll() {
    activeDropdown.value = null
    isAccountOpen.value = false
    isRecentOpen.value = false
    isWishlistOpen.value = false
    overlayStore.close()
  }

  return {
    activeDropdown,
    isAccountOpen,
    isRecentOpen,
    isWishlistOpen,
    toggleDropdown,
    closeAll
  }
})
