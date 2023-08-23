import axios from "axios";

export const fetchProductContent = async (url: string) => {
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
        }
    });
    return data;
}
