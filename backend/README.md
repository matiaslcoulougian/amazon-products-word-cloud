# Amazon Word Cloud

This is a backend service for the Amazon Word Cloud application. It processes product URLs, generates word frequencies from product descriptions, and stores them in a MongoDB database. The service uses BullMQ for job queueing and Redis for caching.

## Prerequisites

You need to have the following installed on your machine:

- Node.js
- Docker

## Setup

After cloning the repository cd into backend folder and install the dependencies:

bash npm install

## Running the Application

To start the application, you need to start the MongoDB and Redis services using Docker Compose:

bash docker-compose up -d

Then, you can start the application in development mode with:

bash npm run dev


Or build and start the application in production mode with:

bash npm run build npm start

## Testing

To run the tests, use:

bash npm run test

## Dependencies

This application uses several dependencies:

- `axios` for making HTTP requests.
- `bullmq` for managing job queues.
- `cheerio` for web scraping.
- `dotenv` for managing environment variables.
- `express` for the web server.
- `express-sse-ts` for server-sent events.
- `mongodb` and `mongoose` for the database.
- `stopword` for processing and filtering words.

Author: Matias Coulougian
Date: 08/23/2023
