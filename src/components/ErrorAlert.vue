<template>
  <div
    v-if="error"
    class="mt-4 p-4 bg-red-950 border border-red-900 text-red-100 rounded"
  >
    {{ error }}
  </div>
</template>

<script setup>
defineProps({
  error: { type: String, required: true },
});
</script>
