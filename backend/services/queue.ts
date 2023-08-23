import {Job, Queue, Worker} from "bullmq";
import {buildProductDescriptionFrequencies} from "../coordinator/coordinator";

const queueName = process.env.QUEUE_NAME || 'product-urls';

const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
}
export const productUrlsQueue = new Queue(queueName, { connection });

const DEFAULT_REMOVE_CONFIG = {
    removeOnComplete: {
        age: 3600,
    },
    removeOnFail: {
        age: 24 * 3600,
    },
};

export const addProductUrlToQueue = async (productUrl: string): Promise<Job> => {
    return productUrlsQueue.add('processJob', { productUrl }, DEFAULT_REMOVE_CONFIG);
}

export const worker = new Worker(
    queueName,
    async (job: Job) => {
        const frequencies = await buildProductDescriptionFrequencies(job.data.productUrl);
        return JSON.stringify(frequencies)
    },
    { connection }
);