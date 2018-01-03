import * as winston from 'winston';
import * as winstonTransport from 'winston-logentries-transport';

const Logentries = winstonTransport.Logentries;

export const logger = () => (new (winston.Logger)({
  transports: [
    new Logentries({ token: process.env.LOGENTRIES_TOKEN, timestamp: false }),
  ],
}));