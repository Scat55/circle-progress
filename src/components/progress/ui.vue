<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'

/**
 * Props
 */
const props = defineProps({
  progress: {
    type: Number,
    default: 0
  },
  status: {
    type: String as () => 'in-progress' | 'success' | 'warning' | 'error',
    default: 'in-progress'
  },
  type: {
    type: String as () => 'circle' | 'dashboard',
    default: 'circle'
  },
  size: {
    type: Number,
    default: 120
  },
  strokeWidth: {
    type: Number,
    default: 10
  },
  duration: {
    type: Number,
    default: 800 // ms
  }
})

/**
 * Внутреннее состояние для анимации
 */
const progressValue = ref(Math.min(100, Math.max(0, props.progress)))
let rafId: number | null = null

/**
 * Радиус и длина окружности
 */
const radius = computed(() => props.size / 2 - props.strokeWidth / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

/**
 * Тип dashboard
 */
const isDashboard = computed(() => props.type === 'dashboard')

/**
 * Длина окружности для прогресса
 */
const effectiveCircumference = computed(() => {
  return isDashboard.value ? circumference.value / 2 : circumference.value
})

/**
 * Смещение дуги
 */
const dashOffset = computed(() => {
  return effectiveCircumference.value * (1 - progressValue.value / 100)
})

/**
 * Поворот круга
 */
const transformRotate = computed(() => {
  if (isDashboard.value) {
    return `rotate(-180, ${props.size / 2}, ${props.size / 2})`
  }
  return `rotate(-90, ${props.size / 2}, ${props.size / 2})`
})

/**
 * Цвет прогресса
 */
const progressColor = computed(() => {
  const percent = progressValue.value / 100
  if (props.status === 'in-progress') return '#1B84FF'
  if (props.status === 'error') return '#FF4D4F'
  if (props.status === 'warning') return '#FAAD14'
  if (props.status === 'success') return '#52C41A'
  // in-progress: gradient red -> green
  const r = Math.round(255 * (1 - percent))
  const g = Math.round(77 + 178 * percent) // 77->255
  return `rgb(${r},${g},0)`
})

/**
 * Плавная анимация
 */
function animateTo(target: number) {
  if (rafId) cancelAnimationFrame(rafId)

  const start = progressValue.value
  const startTime = performance.now()

  function animate(time: number) {
    const elapsed = time - startTime
    const t = Math.min(elapsed / props.duration, 1)

    progressValue.value = start + (target - start) * t

    if (t < 1) {
      rafId = requestAnimationFrame(animate)
    } else {
      rafId = null
    }
  }

  rafId = requestAnimationFrame(animate)
}

/**
 * Следим за изменением props.progress
 */
watch(
  () => props.progress,
  (val) => {
    const safeVal = Math.min(100, Math.max(0, val))
    animateTo(safeVal)
  },
  { immediate: true }
)

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <svg :width="size" :height="isDashboard ? size/2 + strokeWidth : size">
    <!-- Фон -->
    <circle
      :r="radius"
      :cx="size/2"
      :cy="size/2"
      :stroke-width="strokeWidth"
      stroke="#eee"
      fill="none"
      :stroke-dasharray="effectiveCircumference"
      :stroke-dashoffset="0"
      :transform="transformRotate"
    />
    <!-- Прогресс -->
    <circle
      :r="radius"
      :cx="size/2"
      :cy="size/2"
      :stroke-width="strokeWidth"
      :stroke="progressColor"
      fill="none"
      stroke-linecap="round"
      :stroke-dasharray="effectiveCircumference"
      :stroke-dashoffset="dashOffset"
      :transform="transformRotate"
    />
    <!-- Текст -->
    <text
      :x="size/2"
      :y="isDashboard ? radius + strokeWidth/2 : size/2"
      text-anchor="middle"
      alignment-baseline="middle"
      font-size="20"
      font-weight="600"
    >
      {{ Math.round(progressValue) }}%
    </text>
  </svg>
</template>
