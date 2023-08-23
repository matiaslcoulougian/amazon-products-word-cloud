import * as stopword from 'stopword';


export const countWordFrequencies = async (description: string) => {
    let word = '';
    const wordToFrequencies = new Map<string, number>();

    // Iterate over each character in the string
    for (let i = 0; i < description.length; i++) {
        const char = description[i];

        // If the character is a space or punctuation, process the current accumulated word
        if (/\s|\p{Punctuation}/u.test(char)) {
            if (word !== '') {
                // Skip if word contains non-alphabetic characters or is a stopword
                if (
                    /\b[a-z]+\b/.test(word) &&
                    stopword.removeStopwords([word]).length > 0
                ) {
                    // Update the word frequency in the database
                    const wordFrequency = wordToFrequencies.get(word)
                    wordToFrequencies.set(word, (wordFrequency || 0) + 1);
                }

                // Reset the word
                word = '';
            }
        } else {
            // If the character is not a space or punctuation, add it to the current word (converted to lowercase)
            word += char.toLowerCase();
        }
    }
    return wordToFrequencies;
};