import Url, { IUrl } from "../models/url";

export const findUrl = async (url: string): Promise<IUrl | null> => {
    return Url.findOne({ url });
}