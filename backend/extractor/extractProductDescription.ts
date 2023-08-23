import * as cheerio from 'cheerio';

export const extractProductDescription = (html: string): string => {
    let $ = cheerio.load(html);
    return $('#productDescription p span').text();
}