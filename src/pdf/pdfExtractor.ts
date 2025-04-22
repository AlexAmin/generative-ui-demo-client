import * as PDFJS from "pdfjs-dist"
import type {TextContent, TextItem, TextMarkedContent} from "pdfjs-dist/types/src/display/api"

PDFJS.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.1.91/build/pdf.worker.mjs"

export async function extractTextFromPDF(file: File) {
    const buffer = await file.arrayBuffer()
    const pdf = await PDFJS.getDocument(buffer).promise
    const numPages = pdf.numPages;

    const pagePromises = [];
    for (let i = 1; i <= numPages; i++) {
        pagePromises.push(getPageText(pdf, i));
    }

    const pageTexts = await Promise.all(pagePromises);
    return pageTexts.join('\n');
}

async function getPageText(pdf: PDFJS.PDFDocumentProxy, pageNumber: number): Promise<string> {
    const page = await pdf.getPage(pageNumber);
    const textContent: TextContent = await page.getTextContent();
    return textContent.items.map((item: TextItem | TextMarkedContent) => {
        return (item as TextItem).str
    }).join("\n");
}