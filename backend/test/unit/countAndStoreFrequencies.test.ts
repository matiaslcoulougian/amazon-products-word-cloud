import { countWordFrequencies } from "../../generator/countWordFrequencies";

describe('countWordFrequencies', () => {

    it('should count and build frequencies map', async () => {
        const description = 'This is a test description. It includes several words, and things. Including test description.'

        const result = await countWordFrequencies(description);

        // Verify the result is correct
        expect(result).toEqual(new Map(
            [
                ['test', 2],
                ['description', 2],
                ['includes', 1],
                ['several', 1],
                ['words', 1],
                ['things', 1],
                ['including', 1]
            ])
        );
    });
});
