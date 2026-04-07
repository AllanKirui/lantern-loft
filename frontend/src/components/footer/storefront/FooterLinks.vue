<script setup lang="ts">
interface Link {
  href: string
  text: string
}

interface LinkGroup {
  title: string
  links: Link[]
}

interface Props {
  group: LinkGroup
}

defineProps<Props>()
</script>

<template>
  <h3 class="text-lg font-bold">{{ group.title }}</h3>
  <ul class="mt-3 flex flex-col gap-2 text-bone">
    <li
      v-for="link in group.links"
      :key="link.text"
      class="flex items-center gap-2"
    >
      <BaseIcon
        name="chevron"
        class="w-[9.5px] h-[5.5px] sm:w-[11px] sm:h-[6.8px] text-crayola duration-200 -rotate-90"
        :stroke-width="6"
      />
      <RouterLink :to="link.href" :data-replace="link.text" class="link-hover">
        <span>{{ link.text }}</span></RouterLink
      >
    </li>
  </ul>
</template>
