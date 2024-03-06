import * as express from 'express';
import configureBot from './bot';
import { connectDB } from './mongo/connection';
import * as cors from 'cors';
const app = express();
import { router } from './routes/router';

app.use(cors());
app.use(express.json());

app.use('/', router);

connectDB().then(() => console.log('Connected to database!'));

export const chatBot = configureBot();

const server = app.listen(3001, () => {
  console.log('Server is up and running ⚡');
});

chatBot.launch().then(() => console.log('Bot has started 🤖'));

process.once('SIGINT', () => {
  console.log('stopping');
  chatBot.stop();
  server.close();
});
process.once('SIGTERM', () => {
  console.log('stopping');
  chatBot.stop();
  server.close();
});
