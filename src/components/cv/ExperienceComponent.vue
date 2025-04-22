<template>
  <div v-if="experience"
       class="flex-1 flex flex-col h-full   overflow-hidden">
    <h2 class="text-3xl font-bold mb-4 ">Professional Experience</h2>
    <ul class="flex-1 flex flex-col overflow-y-auto">
      <transition-group
          class="flex flex-col gap-y-3"
          enter-active-class="transition-all duration-300 ease-in-out"
          enter-from-class="opacity-0 translate-x-8"
          enter-to-class="opacity-100 translate-x-0"
          move-class="transition-all duration-500 ease-in-out"
          tag="div"
      >
        <li
            v-for="(item, index) in experience.items"
            :key="index"
            class="rounded-lg transition-all duration-300
            border border-gray-400 dark:border-gray-600">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-bold ">{{ item.role }}</h3>
                <p class="text-teal-400">{{ item.seniority }}</p>
              </div>
              <div class="px-3 py-1 rounded-full text-sm
                          bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {{ formatDateRange(item.startDate, item.endDate) }}
              </div>
            </div>

            <div class="mb-4">
              <div class="flex items-center space-x-2">
                <PhosphorIcon :icon="PhBuilding" size="xs"/>
                <p class="font-medium">{{ item.company }}</p>
              </div>

              <div class="flex items-center space-x-2 mt-1">
                <PhosphorIcon :icon="PhMapPin" size="xs"/>
                <p>{{ [item.city, item.country].filter((item) => item || ''.length > 0).join(", ") }}</p>
              </div>
            </div>

            <div>
              <h4 class=" font-medium mb-2">Responsibilities:</h4>
              <p class="opacity-70 text-sm">{{ item.responsibilities }}</p>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Props
import type {CVExperience} from "../../types/cv/CVExperience.ts";
import PhosphorIcon from "../PhosphorIcon.vue";
import {PhBuilding, PhMapPin} from "@phosphor-icons/vue";
import {useCVStore} from "../../stores/cv.ts";
import {computed, type ComputedRef} from "vue";
import {CVSection} from "../../types/CVSection.ts";

const cv = useCVStore()
const experience: ComputedRef<CVExperience | undefined> = computed(() => cv.cv[CVSection.Experience] as CVExperience | undefined)

// Format date range helper function
const formatDateRange = (startDate: string | null, endDate: string | null): string => {
  const start = startDate ? new Date(startDate).getFullYear() : '';
  const end = endDate ? new Date(endDate).getFullYear() : 'Present';

  return [start, end].filter((item) => (item?.toString() || "").length > 0).join(" - ")
};
</script>