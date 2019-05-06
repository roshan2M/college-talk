import * as express from 'express';
import * as bodyParser from 'body-parser';
import { verifyWebhook, processWebhook } from './utils/webhook';

const app: express.Express = express();
const port: number = 3000;

// Apply Middle-ware to Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Express server is listening on port 3000');
});

// Main Endpoints
app.get('/webhook', verifyWebhook);

app.post('/webhook', processWebhook);
