import './env.js';
import { connectToDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config();
import app from './server.js';

const PORT = process.env.PORT || 3500;
const handleListening = () => {
  console.log(`server is listening on ${PORT}`);
};

connectToDB((err) => {
  if (!err) {
    app.listen(PORT, handleListening);
  }
});
