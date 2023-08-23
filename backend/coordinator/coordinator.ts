import { fetchProductContent } from "../services/fetchProductContent";
import { extractProductDescription } from "../extractor/extractProductDescription";
import { countWordFrequencies } from "../generator/countWordFrequencies";
import {getAllFrequencies} from "../queries/getAllFrequencies";
import {UrlStatus} from "../models/url";
import {findUrl} from "../queries/findUrl";
import {createUrl} from "../queries/createUrl";
import {updateUrlStatus} from "../queries/updateUrlStatus";
import {IWordFrequency} from "../models/wordFrequency";
import {addProductUrlToQueue} from "../services/queue";
import {updateWordFrequencies} from "../queries/updateWordFrequencies";

export const buildWordCloudFrequencies = async (url: string): Promise<void> => {
    let urlDocument = await findUrl(url);
    // If the URL is already in the database and status is not failed skip it to avoid reprocessing.
    if (urlDocument && urlDocument.status !== UrlStatus.Failed) return;
    // Create url document with status queued.
    await createUrl(url);
    // Add url to queue for processing.
    await addProductUrlToQueue(url);
}

export const buildProductDescriptionFrequencies = async (url: string): Promise<IWordFrequency[]> => {
    try {
        await updateUrlStatus(url, UrlStatus.Processing)
        const html = await fetchProductContent(url);
        const description = extractProductDescription(html);
        const wordToFrequency = await countWordFrequencies(description);
        await updateWordFrequencies(wordToFrequency);
        await updateUrlStatus(url, UrlStatus.Completed);
        return getAllFrequencies();
    }
    catch (e) {
        await updateUrlStatus(url, UrlStatus.Failed);
        throw e;
    }
}