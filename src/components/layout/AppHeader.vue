<template>
  <header class="flex items-center justify-between mb-3">
    <a
      href="/"
      class="flex items-center gap-2 text-xl font-semibold text-gray-100"
    >
      <span class="text-gray-500 relative bottom-0.5">{ ; }</span>
      <span>JSON Viewer</span>
    </a>

    <a
      href="https://github.com/carlssonemil/json-viewer"
      target="_blank"
      rel="noopener noreferrer"
      class="text-gray-200"
    >
      <GitHubIcon size="22" />
    </a>
  </header>
</template>

<script setup>
import GitHubIcon from "../svg/GitHubIcon.vue";
</script>
