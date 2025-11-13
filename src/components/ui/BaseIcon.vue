<template>
  <component
    :is="IconComponent"
    :class="`size-${props.size} text-${props.color}`"
  />
</template>

<script setup>
import { computed } from "vue";
import * as Icons from "lucide-vue-next";

const props = defineProps({
  color: { type: String, default: "gray-400" },
  icon: { type: String, required: true },
  size: { type: [Number, String], default: 16 },
});

const IconComponent = computed(() => {
  const iconName = props.icon
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return Icons[iconName] || null;
});
</script>
