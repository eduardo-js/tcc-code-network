import 'dotenv/config';
import mongoose from 'mongoose';

import app from './app';
import { env } from './config';

const main = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    app.listen(env.port, () => {
      console.info(`Server running at: http://localhost:${env.port}`);
    });
  } catch (error) {
    const message = error === typeof Object ? JSON.stringify(error) : (error as string);

    console.info(`Oops, the server did not start.\nReason -> ${message}`);
  }
};

void main();
