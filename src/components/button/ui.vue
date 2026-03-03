<script setup lang="ts">
import { type ButtonProps, UiSize } from "@/types";
import { computed } from "vue";
import { UiColor } from "@/types";

/**
 * Props
 */
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: UiColor.Default,
  size: UiSize.Md,
  disabled: false,
});
/**
 * Emits
 */
const emit = defineEmits(["click"]);

/**
 * Эмитит событие клика в родительский компонент
 */
const onClick = (event: MouseEvent): boolean | void => {
  if (props.disabled) {
    return false;
  }

  emit("click", event);
};

const classList = computed(() => [
  {
    [`--${props.variant}-variant`]: props.variant,
    [`--${props.size}-size`]: props.size,
    "--is-disabled": props.disabled,
  },
]);
</script>

<template>
  <button
    :class="['UiButton', classList]"
    @click="onClick"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.UiButton {
  color: #fff;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  &.--default-variant {
    background-color: $primary;
  }

  &.--in-progress-variant {
    background-color: $inProgress;
  }

  &.--success-variant {
    background-color: $success;
  }

  &.--warning-variant {
    background-color: $warning;
  }

  &.--error-variant {
    background-color: $error;
  }

  &.--sm-size {
    font-size: 12px;
    padding: 4px 8px;
  }

  &.--md-size {
    padding: 8px 12px;
  }

  &.--lg-size {
    padding: 12px 16px;
  }

  &.--is-disabled {
    cursor: not-allowed;
    background-color: #7396c0;
  }
}
</style>
