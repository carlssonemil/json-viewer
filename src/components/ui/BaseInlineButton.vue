<template>
  <button
    class="p-2 rounded cursor-pointer hover:bg-zinc-800 transition-colors duration-150 select-none"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineEmits(["click"]);
</script>
