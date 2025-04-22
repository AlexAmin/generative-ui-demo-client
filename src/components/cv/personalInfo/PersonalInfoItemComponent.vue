<template>
  <span v-if="text && text.length > 0"
        :class="[link?'text-blue-700 dark:text-blue-400 cursor-pointer':'']"
        class="flex flex-row gap-x-1 items-center">
    <PhosphorIcon :icon="icon" size="xs"/>
    <span>{{ text }}</span>
  </span>
</template>
<script lang="ts" setup>
import PhosphorIcon from "../../PhosphorIcon.vue";
import type {Component} from "vue";

defineProps<{
  link?: boolean
  text?: string
  icon: Component
}>()
</script>