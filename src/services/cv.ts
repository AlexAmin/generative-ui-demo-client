import axios, {type AxiosResponse} from "axios";
import type {CV} from "../types/cv/CV.ts";
import type {Ref} from "vue";
import {CVSection} from "../types/CVSection.ts";
import {jsonrepair} from "jsonrepair";
import {
    doc,
    type DocumentSnapshot,
    type FirestoreError,
    getFirestore,
    onSnapshot,
    type Unsubscribe
} from "firebase/firestore";

const API_URL = import.meta.env.VITE_API_URL
export const useCVService = () => {

    async function promptCVFirestore(inputText: string, cvRef: Ref<CV>) {
        const response: AxiosResponse<{ id: string }> = await axios.post(
            `${API_URL}/firestore`,
            {text: inputText}
        )
        if (response.status > 200) throw new Error("API request failed")
        const db = getFirestore()
        const id: string = response.data.id
        cvRef.value = {}
        const unsubscribe: Unsubscribe = onSnapshot(
            doc(db, "cv", id),
            (snapshot: DocumentSnapshot) => {
                const data = snapshot.data()
                if (!data) return
                cvRef.value = data as CV
                if (data.status === "done") unsubscribe()
            }, (error: FirestoreError) => {
                console.warn("Firestore error", error)
            })
        return null
    }

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
        const sectionedData: { [key: string]: string } =
            Object.fromEntries(Object.values(CVSection).map(section => [section, ""]))
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
        promptCVFirestore,
        promptCV
    }
}