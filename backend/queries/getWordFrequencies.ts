import WordFrequency, { IWordFrequency } from "../models/wordFrequency";

export const getWordFrequencies = async (size: number = 100): Promise<IWordFrequency[]> => {
    return WordFrequency.find().sort({ frequency: -1 }).limit(size);
}