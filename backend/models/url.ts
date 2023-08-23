import mongoose, { Schema, Document } from 'mongoose';

export enum UrlStatus {
    Queued = 'Queued',
    Processing = 'Processing',
    Failed = 'Failed',
    Completed = 'Completed'
}

export interface IUrl extends Document {
    url: string;
    status: UrlStatus;
}

const UrlSchema: Schema = new Schema({
    url: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(UrlStatus) },
});

export default mongoose.model<IUrl>('Url', UrlSchema);
