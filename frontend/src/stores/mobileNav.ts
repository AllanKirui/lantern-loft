import { defineStore } from "pinia"
import { ref } from "vue"

type DropdownName = "menu" | "account"

export const useMobileNavStore = defineStore("mobileNav", () => {
  const activeDropdown = ref<DropdownName | null>(null)
  const isMenuOpen = ref(false)
  const isAccountOpen = ref(false)

  function toggleDropdown(menu: DropdownName) {
    const isSame = activeDropdown.value === menu
    activeDropdown.value = isSame ? null : menu

    isMenuOpen.value = activeDropdown.value === "menu" && true
    isAccountOpen.value = activeDropdown.value === "account" && true
  }

  return { activeDropdown, isMenuOpen, isAccountOpen, toggleDropdown }
})
