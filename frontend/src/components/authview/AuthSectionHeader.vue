<script setup lang="ts">
interface AuthSectionHeaderData {
  title: string
  text: string
}

interface Props {
  sectionHeaderData: AuthSectionHeaderData
}

defineProps<Props>()
</script>

<template>
  <header>
    <div class="flex items-center gap-1">
      <BaseIcon
        name="chevron"
        class="mt-0.5 w-[8px] h-[5.5px] rotate-90 text-crayola"
        :stroke-width="8"
      />
      <RouterLink
        to="/"
        data-replace="Back to the store"
        class="block w-fit link-hover uppercase text-xs font-medium text-crayola"
        ><span>Back to the store</span></RouterLink
      >
    </div>

    <h1 id="auth-title" class="mt-4 text-xl font-semibold">
      {{ sectionHeaderData.title }}
    </h1>

    <p class="mt-1.5 leading-normal">
      {{ sectionHeaderData.text }}
    </p>

    <small class="block mt-4 text-right text-crayola"
      ><em>* Required</em></small
    >
  </header>
</template>
