import { Request, Response } from 'express';
import { processMessage } from './process';

export const verifyWebhook = (request: Request, response: Response) => {
    const VERIFY_TOKEN: string = 'pusher-bot';

    const mode: string = request.query['hub.mode'];
    const token: string = request.query['hub.verify_token'];
    const challenge: string = request.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
        response.status(200).send(challenge);
    } else {
        response.sendStatus(403);
    }
};

export const processWebhook = async (request: Request, response: Response) => {
    let body = request.body;
    if (body.object === 'page') {
        body.entry.forEach(async (entry: any) => {
            const webhook_message: string = entry.messaging[0].message;
            const response_message: string = await processMessage(webhook_message);
            console.log(response_message);
        });
        // Returns a '200 OK' response to all requests
        response.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        response.sendStatus(404);
    }
};
