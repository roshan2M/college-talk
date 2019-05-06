// import fetch from 'node-fetch';
import { SessionsClient } from 'dialogflow';

const projectId: string = 'testbot-62913'; // https://dialogflow.com/docs/agents#settings
const sessionId: string = '123456';
const languageCode: string = 'en-US';

const config: any = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n"),
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
    }
};

const sessionClient: SessionsClient = new SessionsClient(config);
const sessionPath: string = sessionClient.sessionPath(projectId, sessionId);

/** Once FB access is determined
const FACEBOOK_ACCESS_TOKEN: string = process.env.FACEBOOK_ACCESS_TOKEN;

const sendTextMessage = (userId: string, text: string) => {
    return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                messaging_type: 'RESPONSE',
                recipient: { id: userId },
                message: { text }
            })
        }
    );
}
*/

export const processMessage: Function = (message: string): Promise<string> => {
    const request: any = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            }
        }
    };
    return new Promise<string>((resolve: Function, reject: Function) => {
        sessionClient
            .detectIntent(request)
            .then((responses: any[]) => {
                resolve(responses[0].queryResult.fulfillmentText);
            })
            .catch((error: Error) => {
                reject(error);
            });
    });
}
