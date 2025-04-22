import {ref, type Ref} from "vue";
import type {CVPersonalInfo} from "../types/cv/CVPersonalInfo.ts";
import type {CVExperience} from "../types/cv/CVExperience.ts";
import type {CVEducation} from "../types/cv/CVEducation.ts";
import {CVSection} from "../types/CVSection.ts";
import * as demo from "../demo.json";
import {extractTextFromPDF} from "../pdf/pdfExtractor.ts";
import {useCVService} from "../services/cv.ts";
import type {CV} from "../types/cv/CV.ts";
import {defineStore} from "pinia";

export const useCVStore = defineStore("cv", () => {
    const cv: Ref<CV> = ref({})
    const loadingExtractingPDF: Ref<boolean> = ref(false)
    const loadingPrompt: Ref<boolean> = ref(false)

    function loadDemo() {
        cv.value[CVSection.PersonalInfo] = demo.personalInfo as unknown as CVPersonalInfo
        cv.value[CVSection.Experience] = demo.experience as unknown as CVExperience
        cv.value[CVSection.Education] = demo.education as unknown as CVEducation
    }

    async function fileSelected(event: InputEvent) {
        loadingExtractingPDF.value = true
        const target = event.target as HTMLInputElement
        const files: FileList | null = target.files
        if (!files || files.length === 0) return
        const text = await extractTextFromPDF(files[0])
        loadingPrompt.value = true
        loadingExtractingPDF.value = false
        cv.value = {}
        await useCVService().promptCV(text, cv)
        loadingPrompt.value = false
    }

    return {
        fileSelected,
        cv,
        loadingExtractingPDF,
        loadingPrompt,
        loadDemo
    }
})