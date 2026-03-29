import { useCollection } from "@/composables/useCollection"

export type CollectionContext<T> = ReturnType<typeof useCollection<T>>
