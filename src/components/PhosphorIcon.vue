<template>
  <component :is="icon"
             :class="{
    'h-4 w-4': size === 'xxs',
    'h-5 w-5': size === 'xs',
    'h-6 w-6': size === 'sm',
    'h-8 w-8': size === 'md' || !size,
    'h-16 w-16': size === 'lg',
    'h-24 w-24': size === 'xl',
    'h-32 w-32': size === '2xl',
    'text-zinc-500 dark:text-zinc-400': secondary
  }"
             class="shrink-0"
             :weight="filled ? 'fill' : 'regular'"/>
</template>
<script lang="ts" setup>
import {type Component} from "vue";

defineProps<{
  size?: string,
  secondary?: boolean
  icon: Component
  filled?: boolean
}>()
</script>
