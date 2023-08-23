import Url, { IUrl, UrlStatus } from "../models/url";

export const createUrl = async (url: string): Promise<IUrl> => {
    const newUrl = new Url({ url, status: UrlStatus.Queued });
    return newUrl.save();
}