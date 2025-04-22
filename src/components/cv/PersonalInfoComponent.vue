<template>
  <div v-if="personalInfo"
       class="flex flex-col p-6 rounded-lg w-full
              border border-gray-400 dark:border-gray-600">
    <h2 class="text-2xl font-bold pb-2
    border-b border-gray-200 dark:border-gray-700 ">Personal Information</h2>
    <div class="flex flex-row">
      <div class="flex flex-col gap-y-1 p-5 rounded-lg col-span-full">
        <h3 class="text-xl font-semibold">{{ personalInfo.fullName || '' }}</h3>
        <PersonalInfoItemComponent
            :text="personalInfo.linkedIn"
            :icon="PhLinkedinLogo"/>
        <PersonalInfoItemComponent
            :text="personalInfo.phone"
            :icon="PhPhone"/>
        <PersonalInfoItemComponent
            :text="personalInfo.email"
            :icon="PhEnvelope"/>
        <PersonalInfoItemComponent
            :text="personalInfo.website"
            :icon="PhGlobe"/>
        <PersonalInfoItemComponent
            :text="personalInfo.address"
            :icon="PhHouse"/>
        <PersonalInfoItemComponent
            :text="[personalInfo.dateOfBirth, personalInfo.placeOfBirth].filter(Boolean).join(' ')"
            :icon="PhCake"/>
        <PersonalInfoItemComponent
            :text="personalInfo.maritalStatus"
            :icon="PhUsers"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PhCake, PhEnvelope, PhGlobe, PhHouse, PhLinkedinLogo, PhPhone, PhUsers} from "@phosphor-icons/vue";
import {useCVStore} from "../../stores/cv.ts";
import {computed, type ComputedRef} from "vue";
import type {CVPersonalInfo} from "../../types/cv/CVPersonalInfo.ts";
import {CVSection} from "../../types/CVSection.ts";
import PersonalInfoItemComponent from "./personalInfo/PersonalInfoItemComponent.vue";

const cv = useCVStore()
const personalInfo: ComputedRef<CVPersonalInfo | undefined> = computed(() => cv.cv[CVSection.PersonalInfo] as CVPersonalInfo | undefined)
</script>