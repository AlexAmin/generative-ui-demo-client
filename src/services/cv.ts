import axios from "axios";
import type {CV} from "../types/cv/CV.ts";
import type {Ref} from "vue";
import {CVSection} from "../types/CVSection.ts";
import {jsonrepair} from "jsonrepair";

const API_URL = import.meta.env.VITE_API_URL
export const useCVService = () => {

    async function promptCV(inputText: string, cvRef: Ref<CV>) {
        const abortController = new AbortController()
        const stream: ReadableStream<Uint8Array> | null = await axios.post(
            API_URL,
            {text: inputText},
            {
                signal: abortController.signal,
                responseType: "stream",
                adapter: "fetch",
                timeout: 60 * 1000,
            }
        ).then((result) => result.data)
        if (stream) return receiveStreamedCV(cvRef, stream)
        return null
    }

    async function receiveStreamedCV(cv: Ref<CV>, stream: ReadableStream) {
        const sectionedData: { [key: string]: string } = {}
        for (const section of Object.values(CVSection)) {
            sectionedData[section] = ""
        }
        const decoder = new TextDecoder("utf-8");
        const reader = stream.getReader();
        while (true) {
            const {done, value} = await reader.read();
            if (done) break
            const decoderResult = decoder.decode(value).trim()
            const payloads: string[] = decoderResult.split("\n\n")
            for (const payload of payloads) {
                if (payload.length === 0) continue
                const chunk = JSON.parse(payload.trim())
                const section: CVSection = chunk.section as CVSection
                sectionedData[section] += chunk.text
                try {
                    const sectionText = jsonrepair(sectionedData[section])
                    cv.value[section] = JSON.parse(sectionText)
                } catch (e) {
                } // JSON Parsing can sometimes fail, ignore
            }
        }
    }

    return {
        promptCV
    }
}