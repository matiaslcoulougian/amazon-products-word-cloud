import WordFrequency, { IWordFrequency } from "../models/wordFrequency";

export const getAllFrequencies = async (): Promise<IWordFrequency[]> => {
    return WordFrequency.find();
}