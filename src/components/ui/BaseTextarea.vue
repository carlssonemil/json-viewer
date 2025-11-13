<template>
  <textarea
    v-model="model"
    @input="$emit('input', model)"
    class="w-full overflow-hidden p-2 bg-zinc-900 text-gray-200 border border-zinc-800 rounded-md focus:outline-none focus:ring focus:ring-zinc-700"
    v-bind="$attrs"
  />
</template>

<script setup>
const model = defineModel({
  type: String,
  default: "",
});

defineEmits(["input"]);
</script>
