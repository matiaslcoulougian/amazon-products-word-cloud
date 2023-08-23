import express, { Express, Request, Response } from 'express';
import { buildWordCloudFrequencies } from "./coordinator/coordinator";
import SSE from 'express-sse-ts';
import cors from 'cors';
import connectDb from "./services/db";
import {worker} from "./services/queue";

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
    // call coordinator to build word cloud frequencies
    await buildWordCloudFrequencies(productUrl as string);
    res.status(200).send();
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    worker.on('completed', (job) => {
        sse.send(job.returnvalue);
    });
});