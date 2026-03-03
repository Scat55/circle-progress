<script setup lang="ts">
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import "@cyhnkckali/vue3-color-picker/dist/style.css";
import { ref, watch } from "vue";

const props = withDefaults(defineProps<{ value: string }>(), { value: "" });

const emit = defineEmits<{
  (e: "update:value", val: string): void;
}>();

// локальный ref для v-model
const localValue = ref(props.value);

// синхронизация с пропсом
watch(localValue, (val) => emit("update:value", val));
watch(
  () => props.value,
  (val) => (localValue.value = val),
);
</script>

<template>
  <Vue3ColorPicker
    v-model="localValue"
    mode="solid"
    :showColorList="false"
    :showEyeDrop="false"
    type="HEX"
  />
</template>
<style scoped lang="scss">
.ck-cp-container {
  box-shadow: none;
  border: 1px solid #dbdfe9;
  width: 375px;
}
</style>
