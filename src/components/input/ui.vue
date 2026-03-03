<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: number | string | null;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    type?: string;
  }>(),
  {
    modelValue: "",
    disabled: false,
    placeholder: "Введите значение",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
  focus: [value: Event];
  click: [void];
}>();

const isFocused = ref(false);

const isActive = computed(() => {
  return isFocused.value || !!props.modelValue;
});

const onFocus = (event: Event) => {
  if (props.disabled) return;
  isFocused.value = true;
  emit("focus", event);
};

const onBlur = () => {
  isFocused.value = false;
};

const onInput = (event: Event) => {
  if (props.disabled) return;

  let value = (event.target as HTMLInputElement).value;

  // Превращаем в число для проверки
  let num = Number(value);

  if (!isNaN(num)) {
    if (num > 100) num = 100;
    if (num < 0) num = 0; // при желании минимальное значение
    value = num.toString();
  }

  emit("update:modelValue", value);
};

const onChange = (event: Event) => {
  if (props.disabled) return;

  let value = (event.target as HTMLInputElement).value;
  let num = Number(value);

  if (!isNaN(num)) {
    if (num > 100) num = 100;
    if (num < 0) num = 0;
    value = num.toString();
  }

  emit("change", value);
};
</script>

<template>
  <div class="input-wrapper">
    <input
      :value="modelValue"
      class="input"
      :type="type"
      max="100"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @click="emit('click')"
    />

    <label v-if="label" class="input-label" :class="{ active: isActive }">
      {{ label }}
    </label>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
}

.input {
  font-size: 16px;
  border-radius: 8px;
  width: 100%;
  padding: 20px 16px 8px 16px; // увеличили top padding
  border: 1px solid $gray;
  outline: none;

  &:focus {
    border-color: $primary;
  }
}

.input-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition: all 0.2s ease;
}

.input-label.active {
  top: 6px;
  font-size: 12px;
  color: $primary;
  transform: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
