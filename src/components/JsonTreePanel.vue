<template>
  <div
    :class="[
      'overflow-auto font-mono text-sm select-text bg-zinc-900 border border-zinc-800 p-4',
      {
        'h-screen fixed inset-0 z-50 left-0 top-0': isFullscreen,
        'relative mt-3 rounded': !isFullscreen,
      },
    ]"
  >
    <!-- Opening root brace -->
    <div class="text-gray-400 opacity-50">{</div>

    <!-- Nested tree -->
    <div class="ml-2">
      <JsonTree :data="data" ref="tree" />
    </div>

    <!-- Closing root brace -->
    <div class="text-gray-400 opacity-50">}</div>

    <!-- Inline controls -->
    <div class="absolute top-2 right-2 flex space-x-1">
      <BaseInlineButton v-tippy="'Expand all'" @click="expandAll">
        <BaseIcon icon="plus-square" size="4" />
      </BaseInlineButton>

      <BaseInlineButton v-tippy="'Collapse all'" @click="collapseAll">
        <BaseIcon icon="minus-square" size="4" />
      </BaseInlineButton>

      <BaseInlineButton
        v-tippy="'Toggle fullscreen (F / Esc)'"
        @click="toggleFullscreen"
      >
        <BaseIcon :icon="isFullscreen ? 'minimize-2' : 'maximize-2'" size="4" />
      </BaseInlineButton>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import JsonTree from "./JsonTree.vue";

const props = defineProps({
  data: { type: [Object, Array], required: true },
});

const tree = ref(null);
const isFullscreen = ref(false);

function expandAll() {
  tree.value?.setAllCollapsed(false);
}

function collapseAll() {
  tree.value?.setAllCollapsed(true);
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;
}

function exitFullscreen() {
  isFullscreen.value = false;
}

function handleKeydown(event) {
  const key = event.key.toLowerCase();

  // Don't react while typing into input/textarea
  const target = event.target;
  const tag = target?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
    return;
  }

  if (key === "f") {
    event.preventDefault();
    toggleFullscreen();
  } else if (key === "escape" && isFullscreen.value) {
    event.preventDefault();
    exitFullscreen();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});

watch(
  () => props.data,
  (value) => {
    tree.value?.initPaths(value);
  },
  { immediate: true }
);
</script>
