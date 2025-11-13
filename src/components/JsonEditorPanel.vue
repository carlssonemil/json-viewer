<template>
  <div class="w-full relative">
    <BaseTextarea
      v-model="localValue"
      placeholder="Paste JSON here..."
      rows="4"
      @input="onInput"
    />

    <!-- Inline controls -->
    <div class="absolute top-2 right-2 flex space-x-1">
      <BaseInlineButton v-tippy="'Clear JSON'" @click="clearJson">
        <BaseIcon icon="rotate-ccw" size="4" />
      </BaseInlineButton>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "parsed", "parse-error"]);

const localValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    if (value !== localValue.value) {
      localValue.value = value;
    }
  }
);

function parseJson(value) {
  try {
    const parsed = value ? JSON.parse(value) : null;
    emit("parsed", parsed);
    emit("parse-error", "");
  } catch (e) {
    emit("parsed", null);
    emit("parse-error", e.message || "Invalid JSON");
  }
}

function onInput() {
  emit("update:modelValue", localValue.value);
  parseJson(localValue.value);
}

function clearJson() {
  localValue.value = "";
  emit("update:modelValue", "");
  emit("parsed", null);
  emit("parse-error", "");
}
</script>
