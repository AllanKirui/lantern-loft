<script setup lang="ts">
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter"

interface Props {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: "text",
  required: false
})
</script>

<template>
  <div class="auth-form-control">
    <div class="relative">
      <input
        :id="id"
        :name="name"
        :type="type"
        :required="required"
        placeholder=" "
        class="auth-input"
      />

      <label :for="id" class="auth-label text-[15px]">
        {{ uppercaseFirstLetter(label) }}

        <span v-if="required" class="text-crayola">*</span>
      </label>
    </div>

    <!-- TODO show error messages here -->
  </div>
</template>

<style scoped>
.auth-form-control {
  position: relative;
}
.auth-input {
  padding: 10px 12px;
  width: 100%;
  border-radius: 0.25rem;
  background: #1a1a1a;
  color: #f6c96e;
}
.auth-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(246, 201, 110, 0.75);
}
.auth-label {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  font-weight: 500;
  color: #fefaea;
  transition: 0.3s cubic-bezier(0.345, 0.115, 0.135, 1.42);
}
.auth-input:focus + .auth-label,
.auth-input:not(:placeholder-shown) + .auth-label {
  left: 8px;
  font-size: 14px;
  top: -14px;
  color: #e7d9cc;
}
.auth-input:invalid {
  color: transparent;
}
.auth-input:invalid:focus {
  color: inherit;
  transition: color 0.3s ease;
}
</style>
