import { defineStore } from "pinia"
import { ref } from "vue"
import { useOverlayStore } from "./overlay"

type DropdownName = "account" | "recent" | "wishlist"

export const useDesktopNavStore = defineStore("desktopNav", () => {
  const STORE_ID = "desktop-nav"

  const overlayStore = useOverlayStore()
  const activeDropdown = ref<DropdownName | null>(null)
  const isAccountOpen = ref(false)
  const isRecentOpen = ref(false)
  const isWishlistOpen = ref(false)

  function toggleDropdown(menu: DropdownName) {
    const isSame = activeDropdown.value === menu
    activeDropdown.value = isSame ? null : menu

    if (isSame) {
      overlayStore.close(STORE_ID)
    } else {
      overlayStore.setZIndex(99)
      overlayStore.open(STORE_ID)
    }

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
