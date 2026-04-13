import { defineStore } from "pinia"
import { ref } from "vue"
import { useOverlayStore } from "./overlay"

type DropdownName = "menu" | "account" | "search"

export const useMobileNavStore = defineStore("mobileNav", () => {
  const STORE_ID = "mobile-nav"

  const overlayStore = useOverlayStore()
  const activeDropdown = ref<DropdownName | null>(null)
  const isMenuOpen = ref(false)
  const isAccountOpen = ref(false)

  function toggleDropdown(menu: DropdownName) {
    const isSame = activeDropdown.value === menu
    activeDropdown.value = isSame ? null : menu
    overlayStore[isSame ? "close" : "open"](STORE_ID)

    isMenuOpen.value = activeDropdown.value === "menu" && true
    isAccountOpen.value = activeDropdown.value === "account" && true
  }

  function closeAll() {
    activeDropdown.value = null
    isMenuOpen.value = false
    isAccountOpen.value = false
    overlayStore.close()
  }

  return { activeDropdown, isMenuOpen, isAccountOpen, toggleDropdown, closeAll }
})
