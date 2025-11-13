<template>
  <ul class="ml-0 list-none">
    <li
      v-for="({ key, val, path, isObjectVal, isEmptyVal }, index) in entries"
      :key="path"
      class="relative pl-6"
    >
      <!-- Toggle button for object/array nodes -->
      <button
        v-if="isObjectVal"
        class="absolute left-1 top-0.5 cursor-pointer select-none rounded text-gray-400 hover:text-gray-300 transition-colors duration-150"
        @click="toggle(path)"
      >
        <component
          :is="collapsed.has(path) ? PlusSquare : MinusSquare"
          class="size-4"
        />
      </button>

      <!-- Collapsed object/array summary -->
      <template v-if="isObjectVal && collapsed.has(path)">
        <span class="text-sky-500 select-text font-bold">"{{ key }}"</span>
        <span class="text-gray-400 opacity-50 select-text mr-2">:</span>
        <span class="text-gray-400 opacity-50 select-text">{</span>
        <span
          class="cursor-pointer text-gray-400 opacity-50 select-text mx-2"
          @click="toggle(path)"
          >...</span
        >
        <span class="text-gray-400 opacity-50 select-text">}</span>
        <span v-if="!isLast(index)" class="text-gray-400 opacity-50 select-text"
          >,</span
        >
      </template>

      <!-- Expanded node (primitive or object/array) -->
      <template v-else>
        <div class="flex items-start">
          <!-- Key -->
          <span class="text-sky-500 select-text font-bold">"{{ key }}"</span>
          <span class="text-gray-400 opacity-50 select-text mr-2">:</span>

          <!-- Primitive value -->
          <template v-if="!isObjectVal">
            <span class="text-sky-100 select-text">{{ formatValue(val) }}</span>
            <span
              v-if="!isLast(index)"
              class="text-gray-400 opacity-50 select-text"
              >,</span
            >
          </template>

          <!-- Empty object/array -->
          <template v-else-if="isEmptyVal">
            <span class="text-gray-400 opacity-50 select-text">{ }</span>
            <span
              v-if="!isLast(index)"
              class="text-gray-400 opacity-50 select-text"
              >,</span
            >
          </template>

          <!-- Non-empty object/array, opening brace -->
          <template v-else>
            <span class="text-gray-400 opacity-50 select-text">{</span>
          </template>
        </div>

        <!-- Child tree for non-empty expanded object/array -->
        <JsonTree
          v-if="isObjectVal && !collapsed.has(path) && !isEmptyVal"
          :data="val"
          :path="path"
        />

        <!-- Closing brace + trailing comma for non-empty object/array -->
        <div v-if="isObjectVal && !isEmptyVal">
          <span class="text-gray-400 opacity-50 select-text">}</span>
          <span
            v-if="!isLast(index)"
            class="text-gray-400 opacity-50 select-text"
            >,</span
          >
        </div>
      </template>
    </li>
  </ul>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { PlusSquare, MinusSquare } from "lucide-vue-next";

const props = defineProps({
  data: { type: [Object, Array], required: true },
  path: { type: String, default: "root" },
});

const collapsed = ref(new Set());
let allPaths = [];

function isObject(value) {
  return value !== null && typeof value === "object";
}

function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}

function formatValue(value) {
  return typeof value === "string" ? `"${value}"` : String(value);
}

function childPath(key) {
  return `${props.path}.${key}`;
}

function toggle(path) {
  collapsed.value.has(path)
    ? collapsed.value.delete(path)
    : collapsed.value.add(path);
}

const entries = computed(() => {
  const raw = props.data ?? {};
  return Object.entries(raw).map(([key, val]) => {
    const isObjectVal = isObject(val);
    const isEmptyVal = isObjectVal && isEmptyObject(val);
    const path = childPath(key);

    return { key, val, path, isObjectVal, isEmptyVal };
  });
});

function isLast(index) {
  return index === entries.value.length - 1;
}

function collectPaths(obj, path) {
  if (!isObject(obj)) return;

  allPaths.push(path);

  for (const key in obj) {
    collectPaths(obj[key], `${path}.${key}`);
  }
}

function initPaths(rootData) {
  allPaths = [];
  collectPaths(rootData, props.path);
  collapsed.value.clear();
}

function setAllCollapsed(flag) {
  collapsed.value = flag ? new Set(allPaths) : new Set();
}

defineExpose({ initPaths, setAllCollapsed });

watch(
  () => props.data,
  (newData) => initPaths(newData),
  { immediate: true }
);
</script>
