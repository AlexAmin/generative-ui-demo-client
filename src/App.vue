<template>
  <div
      :class="darkMode ? 'dark' : ''"
      class="h-screen w-screen flex flex-col overflow-hidden
      bg-gray-100 dark:bg-gray-900
      text-gray-900 dark:text-gray-100 ">
    <div class="flex-1 flex flex-col gap-y-8 max-w-7xl overflow-hidden mx-auto mt-8 w-full">
      <div class="flex flex-row w-full">
        <h1 class="text-3xl font-semibold">CV Analysis</h1>
        <div class="flex flex-row items-center gap-x-3 ml-auto">
          <LoadingComponent v-if="cv.loadingExtractingPDF || cv.loadingPrompt"/>
          <PhosphorIcon v-if="Object.keys(cv.cv).length > 0" :icon="PhX" class="cursor-pointer hover:scale-105" @click="cv.cv = {}" size="xs"/>
          <PhosphorIcon v-if="darkMode" :icon="PhSun" @click="()=>darkMode=false"/>
          <PhosphorIcon v-else :icon="PhMoon" @click="()=>darkMode=true"/>
        </div>
      </div>
      <div v-if="cv.loadingExtractingPDF" class="flex flex-row">
        <span>Extracting PDF</span>
      </div>
      <div v-else-if="cv.loadingPrompt && Object.keys(cv.cv).length === 0" class="flex flex-row">
        <span>Preparing Analysis</span>
      </div>
      <template v-if="Object.keys(cv.cv).length > 0">
        <PersonalInfoComponent/>
        <div class="flex-1 grid grid-cols-2 gap-x-3 overflow-hidden">
          <ExperienceComponent/>
          <EducationComponent/>
        </div>
      </template>
      <div v-else class="flex flex-col">
        <h2 class="text-lg">Select a CV PDF file to get an Analysis</h2>
        <PDFInputComponent/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingComponent from "./components/LoadingComponent.vue";
import PersonalInfoComponent from "./components/cv/PersonalInfoComponent.vue";
import ExperienceComponent from "./components/cv/ExperienceComponent.vue";
import EducationComponent from "./components/cv/EducationComponent.vue";
import {useCVStore} from "./stores/cv.ts";
import PDFInputComponent from "./components/PDFInputComponent.vue";
import {ref, type Ref} from "vue";
import PhosphorIcon from "./components/PhosphorIcon.vue";
import {PhMoon, PhSun, PhX} from "@phosphor-icons/vue";

const darkMode: Ref<boolean> = ref(false)
const cv = useCVStore()
</script>