// const { format } = require('date-fns');
// const { v4: uuid } = require('uuid');
import format from 'date-fns';
// import {v4:uuid} from 'uuid'
import { promises as fsPromises } from 'fs';
import path from 'path';
// import { path } from 'path';

// import fsPromises from 'fs.'
// const fs = require('fs');
// const fsPromises = require('fs').promises;
// const path = require('path');

export const logEvents = async (message, logName) => {
  // const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  // const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  // try {
  //   if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
  //     await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
  //   }
  //   await fsPromises.appendFile(
  //     path.join(__dirname, '..', 'logs', logName),
  //     logItem
  //   );
  // } catch (err) {
  //   console.log(err);
  // }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
};
