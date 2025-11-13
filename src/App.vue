<template>
  <div class="min-h-screen bg-zinc-950 p-4">
    <AppHeader />

    <!-- JSON input -->
    <JsonEditorPanel
      v-model="rawJson"
      @parsed="onParsed"
      @parse-error="onParseError"
    />

    <!-- Error alert -->
    <ErrorAlert :error="error" />

    <!-- JSON tree preview -->
    <JsonTreePanel v-if="jsonData" :data="jsonData" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppHeader from "./components/layout/AppHeader.vue";
import ErrorAlert from "./components/ErrorAlert.vue";
import JsonEditorPanel from "./components/JsonEditorPanel.vue";
import JsonTreePanel from "./components/JsonTreePanel.vue";

const rawJson = ref("");
const jsonData = ref(null);
const error = ref("");

function onParsed(value) {
  jsonData.value = value;
}

function onParseError(message) {
  error.value = message;
}
</script>
