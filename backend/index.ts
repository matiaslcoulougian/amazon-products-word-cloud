import express, { Express, Request, Response } from 'express';
import { processProductUrl } from "./coordinator/coordinator";
import SSE from 'express-sse-ts';
import cors from 'cors';
import connectDb from "./services/db";
import {worker} from "./services/queue";
import { getWordFrequencies } from "./queries/getWordFrequencies";

const app: Express = express();
const sse = new SSE();

connectDb();

const port = process.env.PORT || 8080;

// enable cors for all origins
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Amazon Word Cloud API');
});

app.get('/stream', sse.init);

// post sending it in the query param productUrl
app.post('/', async (req: Request, res: Response) => {
    // get query param
    const productUrl = req.query.productUrl;
    if (!productUrl) {
        res.status(400).send('productUrl is required');
    }
    // call coordinator to process the productUrl (add to queue)
    await processProductUrl(productUrl as string);
    res.status(200).send();
});

app.get('/frequencies', async (req: Request, res: Response) => {
    const size = req.query.size;
    const frequencies = await getWordFrequencies(Number(size));
    res.status(200).send(JSON.stringify(frequencies));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    worker.on('completed', async () => {
        // send update event to all clients
        sse.send(JSON.stringify({ type: 'update'}));
    });
});