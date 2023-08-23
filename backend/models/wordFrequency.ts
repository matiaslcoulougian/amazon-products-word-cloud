import mongoose, { Schema, Document } from 'mongoose';

export interface IWordFrequency extends Document {
    word: string;
    frequency: number;
}

const WordFrequencySchema: Schema = new Schema({
    word: { type: String, required: true, unique: true },
    frequency: { type: Number, default: 0, index: true }, // index for sorting more efficiently
});

export default mongoose.model<IWordFrequency>('WordFrequency', WordFrequencySchema);