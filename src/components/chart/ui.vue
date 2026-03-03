<script setup lang="ts">
import { computed } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import type { Diagram } from "@/types";
ChartJS.register(ArcElement, Tooltip, Legend);

// Пропс принимает массив с данными секторов
const props = defineProps<{
  sectors?: Diagram[];
}>();

const data = computed(() => ({
  labels: (props.sectors ?? []).map((s) => s.name),
  datasets: [
    {
      data: (props.sectors ?? []).map((s) => Number(s.size)),
      backgroundColor: (props.sectors ?? []).map((s) => s.color),
      borderWidth: 1,
    },
  ],
}));

// Настройки диаграммы
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          const dataset = tooltipItem.dataset;
          const value = dataset.data[tooltipItem.dataIndex];
          const label = props.sectors[tooltipItem.dataIndex].name;
          return `${label}: ${value}%`;
        },
      },
    },
  },
};
</script>

<template>
  <div style="width: auto; height: auto; display: inline-block">
    <Pie :data="data" :options="options" />
  </div>
</template>
