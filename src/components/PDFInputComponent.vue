<template>
  <div @click="()=>fileInput?.click()"
       class="flex flex-col px-4 py-2 rounded-md cursor-pointer w-fit h-fit select-none
        bg-blue-500 hover:bg-blue-600 text-white">
    <input
        type="file"
        ref="fileInput"
        class="opacity-0 cursor-pointer h-fit w-fit hidden"
        @change="(e)=>cv.fileSelected(e as InputEvent)"/>
    <span>Select PDF File</span>
  </div>
</template>

<script lang="ts" setup>
import {ref, type Ref} from "vue";
import {useCVStore} from "../stores/cv.ts";

const fileInput: Ref<HTMLInputElement | null> = ref(null)
const cv = useCVStore()
</script>