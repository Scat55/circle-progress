<script setup lang="ts">
import { ref } from "vue";
import { Progress } from "@/components/progress";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import {
  type ButtonVariant,
  ProgressType,
  Status,
  type StatusCircle,
  type TypeCircle,
} from "@/types";

const progress = ref<number>(30);
const status = ref<StatusCircle>(Status.InProgress);
const type = ref<TypeCircle>(ProgressType.Circle);

const buttonDate: {
  text: string;
  variant: ButtonVariant;
  click: () => void;
}[] = [
  {
    text: "+10%",
    variant: "default",
    click: () => (progress.value = Math.min(100, progress.value + 10)),
  },
  {
    text: "-10%",
    variant: "default",
    click: () => (progress.value = Math.max(0, progress.value - 10)),
  },
  {
    text: "In Progress",
    variant: "default", // кнопка визуально «default», не in-progress
    click: () => (status.value = "in-progress"),
  },
  {
    text: "Success",
    variant: "success",
    click: () => (status.value = "success"),
  },
  {
    text: "Warning",
    variant: "warning",
    click: () => (status.value = "warning"),
  },
  {
    text: "Error",
    variant: "error",
    click: () => (status.value = "error"),
  },
  {
    text: "Toggle Type",
    variant: "default",
    click: () =>
      (type.value =
        type.value === ProgressType.Circle
          ? ProgressType.Dashboard
          : ProgressType.Circle),
  },
];
</script>

<template>
  <Container>
    <div class="main-page">
      <Progress :progress="progress" :status="status" :type="type" />
      <div class="main-page_buttons-list">
        <Button
          v-for="item in buttonDate"
          :variant="item.variant"
          @click="item.click()"
        >
          {{ item.text }}
        </Button>
      </div>
      <RouterLink class="main-page_link" to="/picker">
        <Button>Перейти к Color Picker</Button>
      </RouterLink>
    </div>
  </Container>
</template>

<style scoped lang="scss">
.main-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  &_buttons-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
  }

  &_link {
    margin-top: 30px;
  }
}
</style>
