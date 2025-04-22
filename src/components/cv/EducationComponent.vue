<template>
  <div v-if="education"
       class="flex-1 flex flex-col h-full overflow-hidden">
    <h2 class="text-3xl font-bold mb-4">Educational Experience</h2>
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
            v-for="(item, index) in education.items"
            :key="index"
            class="rounded-lg transition-all duration-300
                  border border-gray-400 dark:border-gray-600">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-bold">{{ item.degree }}</h3>
              </div>
              <div class="px-4 text-nowrap py-1 rounded-full text-sm
              bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {{ formatDateRange(item.startDate, item.endDate) }}
              </div>
            </div>

            <div class="mb-4">
              <div class="flex items-center space-x-2">
                <PhosphorIcon :icon="PhGraduationCap" size="xs"/>
                <p class="font-medium">{{ item.institution }}</p>
              </div>

              <div class="flex items-center space-x-2 mt-1">
                <PhosphorIcon :icon="PhMapPin" size="xs"/>
                <p>{{ [item.city, item.country].filter((item) => item || ''.length > 0).join(", ") }}</p>
              </div>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>


<script setup lang="ts">
import type {CVEducation} from "../../types/cv/CVEducation.ts";
import PhosphorIcon from "../PhosphorIcon.vue";
import {PhGraduationCap, PhMapPin} from "@phosphor-icons/vue";
import {useCVStore} from "../../stores/cv.ts";
import {computed, type ComputedRef} from "vue";
import {CVSection} from "../../types/CVSection.ts";

const cv = useCVStore()
const education: ComputedRef<CVEducation | undefined> = computed(() => cv.cv[CVSection.Education] as CVEducation | undefined)

// Format date range helper function
const formatDateRange = (startDate: string | null, endDate: string | null): string => {
  const start = startDate ? new Date(startDate).getFullYear() : '';
  const end = endDate ? new Date(endDate).getFullYear() : 'Present';

  return `${start} - ${end}`;
};
</script>
