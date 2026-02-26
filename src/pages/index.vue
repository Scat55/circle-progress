<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from "@/components/progress";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ProgressType, Status, type StatusCircle, type TypeCircle } from "@/types";

const progress = ref<number>(30)
const status = ref<StatusCircle>(Status.InProgress)
const type = ref<TypeCircle>(ProgressType.Circle)

const buttonDate = [
  {
    text: '+10%',
    variant: Status.Default,
    click: () => progress.value = Math.min(100, progress.value + 10) },
  {
    text: '-10%',
    variant: Status.Default,
    click: () => progress.value = Math.max(0, progress.value - 10) },
  {
    text: 'In Progress',
    variant: Status.InProgress,
    click: () => status.value =  Status.InProgress },
  {
    text: 'Success',
    variant: Status.Success,
    click: () => status.value = Status.Success, },
  {
    text: 'Warning',
    variant: Status.Warning,
    click: () => status.value = Status.Warning },
  {
    text: 'Error',
    variant: Status.Error,
    click: () => status.value = Status.Error },
  {
    text: 'Toggle Type',
    variant: Status.Default,
    click: () => type.value = type.value === ProgressType.Circle ? ProgressType.Dashboard : ProgressType.Circle },
]
</script>

<template>
  <Container>
  <div class="main-page">
      <Progress :progress="progress" :status="status" :type="type"/>
      <div class="buttons-list">
        <Button v-for="item in buttonDate" :variant="item.variant" @click="item.click()">
          {{ item.text }}
        </Button>
      </div>
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
}

.buttons-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}
</style>
