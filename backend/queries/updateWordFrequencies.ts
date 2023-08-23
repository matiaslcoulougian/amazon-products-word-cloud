import WordFrequency from "../models/wordFrequency";

export const updateWordFrequencies = async (wordToFrequencies: Map<string, number>) => {
    try {
        const bulkOps = Array.from(wordToFrequencies.entries()).map(([word, frequency]) => ({
            updateOne: {
                filter: { word: word },
                update: { $inc: { frequency: frequency } },
                upsert: true
            }
        }));
        await WordFrequency.bulkWrite(bulkOps);
    } catch (err) {
        console.error(err);
    }
}