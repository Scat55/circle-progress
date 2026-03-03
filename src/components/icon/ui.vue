<script setup lang="ts">
import Trash from "@/app/assets/images/Trash.svg";
import Edit from "@/app/assets/images/Edit.svg";

const props = defineProps({
  icon: String,
});

const icons: Record<string, string> = {
  "Trash.svg": Trash,
  "Edit.svg": Edit,
};
</script>

<template>
  <img :src="icons[props.icon]" alt="" />
</template>
