import BaseIcon from "@/components/base/BaseIcon.vue"

declare module "vue" {
  export interface GlobalComponents {
    BaseIcon: typeof BaseIcon
  }
}

export {}
