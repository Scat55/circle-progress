<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Chart } from "@/components/chart";
import type { Diagram } from "@/types";

const AsyncModal = defineAsyncComponent(() => import("@/components/modal"));

const diagramValue = ref<Diagram[]>([]);
const isOpen = ref(false);
const editingSector = ref<Diagram | null>(null);

const openModal = () => {
  editingSector.value = null; // добавление
  isOpen.value = true;
};

const addSector = (newSector: Diagram) => {
  diagramValue.value.push(newSector);
  isOpen.value = false;
};

const editSector = (sector: Diagram) => {
  editingSector.value = { ...sector }; // копия для редактирования
  isOpen.value = true;
};

const updateSector = (updatedSector: Diagram) => {
  if (!editingSector.value) return;

  const oldName = editingSector.value.name; // оригинальное имя

  diagramValue.value = diagramValue.value.map((sector) =>
    sector.name === oldName ? { ...updatedSector } : sector,
  );

  isOpen.value = false;
};

const removeSector = (sector: Diagram) => {
  diagramValue.value = diagramValue.value.filter(
    (item) => item.name !== sector.name,
  );
};
</script>

<template>
  <Container>
    <div class="diagram-page">
      <h1 class="diagram-page_title">Круговая диаграмма</h1>

      <div class="diagram-page_char">
        <div class="diagram-page_content">
          <div
            v-if="diagramValue.length"
            v-for="sector in diagramValue"
            :key="sector.name"
            class="diagram-page_box"
          >
            <div class="diagram-page_box-item">
              <p>{{ sector.name }}</p>
              <p>{{ sector.size }} %</p>

              <div
                :style="{ backgroundColor: sector.color }"
                class="diagram-page_box-item_color"
              />
            </div>
            <div class="diagram-page_box-item_icons">
              <Icon
                class="diagram-page_box-item_icon"
                icon="Edit.svg"
                @click="editSector(sector)"
              />
              <Icon
                class="diagram-page_box-item_icon"
                icon="Trash.svg"
                @click="removeSector(sector)"
              />
            </div>
          </div>

          <span v-else>Создайте сектор</span>
          <Button @click="openModal" size="lg"> Добавить сектор </Button>
        </div>

        <Chart :sectors="diagramValue" />
      </div>

      <div class="diagram-page_modal" v-if="isOpen">
        <!-- Модалка принимает новый сектор или редактируемый -->
        <AsyncModal
          :sector="editingSector"
          @addSector="addSector"
          @updateSector="updateSector"
          @close="isOpen = false"
        />
      </div>
    </div>
  </Container>
</template>

<style scoped lang="scss">
.diagram-page {
  position: relative;
  &_title {
    font-weight: 500;
    border-bottom: 1px solid #cecece;
    margin-top: 40px;
    padding-bottom: 5px;
  }

  &_char {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
  }

  &_content {
    display: flex;
    flex-direction: column;
    width: 400px;
    gap: 16px;
    margin-top: 40px;
  }

  &_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $grayLight;
    width: 400px;
    gap: 12px;

    padding: 18px 20px;
    border-radius: 10px;
    &-item {
      display: flex;
      align-items: center;
      gap: 12px;
      &_color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      &_icons {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      &_icon {
        cursor: pointer;
      }
      p {
        padding-right: 8px;
        border-right: 2px solid rgba(219, 223, 233, 1); // создаёт линию между элементами
      }
    }
  }
}
.diagram-page_modal {
  position: fixed; // занимает весь экран
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // тёмная полупрозрачная подложка
  display: flex;
  align-items: center; // центр по вертикали
  justify-content: center; // центр по горизонтали
  z-index: 1000;
}

.diagram-page_modal > * {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
}
</style>
