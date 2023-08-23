import { fetchProductContent } from "../services/fetchProductContent";
import { extractProductDescription } from "../extractor/extractProductDescription";
import { countWordFrequencies } from "../generator/countWordFrequencies";
import { getWordFrequencies } from "../queries/getWordFrequencies";
import { UrlStatus } from "../models/url";
import { findUrl } from "../queries/findUrl";
import { createUrl } from "../queries/createUrl";
import { updateUrlStatus } from "../queries/updateUrlStatus";
import { IWordFrequency } from "../models/wordFrequency";
import { addProductProcessingToQueue } from "../services/queue";
import { updateWordFrequencies } from "../queries/updateWordFrequencies";

export const buildWordCloudFrequencies = async (url: string, size?: number): Promise<void> => {
    let urlDocument = await findUrl(url);
    // If the URL is already in the database and status is not failed skip it to avoid reprocessing.
    if (urlDocument && urlDocument.status !== UrlStatus.Failed) return;
    // Create url document with status queued.
    await createUrl(url);
    // Add url to queue for processing.
    await addProductProcessingToQueue(url, size);
}


export const buildProductDescriptionFrequencies = async ({ productUrl, size }: { productUrl: string, size?: number } ): Promise<IWordFrequency[]> => {
    try {
        await updateUrlStatus(productUrl, UrlStatus.Processing)
        const html = await fetchProductContent(productUrl);
        const description = extractProductDescription(html);
        const wordToFrequency = await countWordFrequencies(description);
        await updateWordFrequencies(wordToFrequency);
        await updateUrlStatus(productUrl, UrlStatus.Completed);
        return getWordFrequencies(size);
    }
    catch (e) {
        await updateUrlStatus(productUrl, UrlStatus.Failed);
        throw e;
    }
}