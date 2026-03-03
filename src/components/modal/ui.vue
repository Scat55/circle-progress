<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Input } from "@/components/input";
import { Picker } from "@/components/picker";
import { Button } from "@/components/button";
import { type Diagram, UiSize } from "@/types";

const props = defineProps<{
  sector?: Diagram | null; // null или объект для редактирования
}>();

const emit = defineEmits<{
  (e: "addSector", value: Diagram): void;
  (e: "updateSector", value: Diagram): void;
  (e: "close"): void;
}>();

// локальные поля
const colorValue = ref("#ff0000");
const selectorName = ref("");
const selectorSize = ref("");

// если передан сектор для редактирования, заполняем поля
watch(
  () => props.sector,
  (newSector) => {
    if (newSector) {
      selectorName.value = newSector.name;
      selectorSize.value = newSector.size;
      colorValue.value = newSector.color;
    } else {
      selectorName.value = "";
      selectorSize.value = "";
      colorValue.value = "#ff0000";
    }
  },
  { immediate: true },
);

// computed для HEX отображения в Input
const hexValue = computed({
  get: () => colorValue.value,
  set: (val: string) => {
    colorValue.value = val;
  },
});

// добавление / обновление
const saveSector = () => {
  const sectorData: Diagram = {
    name: selectorName.value,
    size: selectorSize.value,
    color: hexValue.value,
  };

  if (props.sector) {
    emit("updateSector", sectorData); // редактирование
  } else {
    emit("addSector", sectorData); // добавление
  }

  emit("close");
};

// проверка кнопки
const disabledButton = computed(
  () => !selectorName.value || !selectorSize.value,
);
</script>

<template>
  <div class="modal">
    <p class="modal-title">
      {{ props.sector ? "Редактирование сектора" : "Добавление сектора" }}
    </p>

    <Input :value="selectorName" v-model="selectorName" label="Наименование" />

    <Input
      :value="selectorSize"
      v-model="selectorSize"
      type="number"
      label="Значение"
    />

    <Input :value="hexValue" v-model="hexValue" label="Цвет" />

    <Picker :value="colorValue" v-model="colorValue" />

    <Button :size="UiSize.Lg" @click="saveSector" :disabled="!!disabledButton">
      {{ props.sector ? "Сохранить изменения" : "Добавить сектор" }}
    </Button>
  </div>
</template>

<style scoped lang="scss">
.modal {
  width: 100%;
  max-width: 410px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  border-radius: 8px;
  padding: 12px 16px;
}
</style>
