import Url, {UrlStatus} from "../models/url";

export const updateUrlStatus = async (url: string, status: UrlStatus) => {
    try {
        await Url.updateOne({ url: url }, { status });
    }
    catch (err) {
        console.error(err);
    }
}