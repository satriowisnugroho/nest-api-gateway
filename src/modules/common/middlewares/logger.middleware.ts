import * as winston from 'winston';
import * as morgan from 'morgan';
import * as path from 'path';
import * as moment from 'moment';
import 'winston-daily-rotate-file';
import { logger } from '../index';

export function loggerMiddleware() {
  if (!JSON.parse(process.env.APP_DEBUG)) {
    return (req, res, next) => next();
  }

  let log;

  if (process.env.APP_DEBUG_TYPE === 'logentries') {
    log = logger();
  } else {
    log = new (winston.Logger)({
      transports: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, '..', '..', '..', '..', 'logs/log'),
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        level: 'debug',
        timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss'),
        json: false,
      }),
    });
  }

  log.stream = { write: message => log.info(message) };

  morgan.token('body', (req) => {
    if (process.env.APP_DEBUG_TYPE === 'logentries') {
      return JSON.stringify(req.body);
    }

    return `\n${JSON.stringify(req.body, null, 2)}`;
  });

  return morgan(`request :method :url :response-time ms :body`, { stream: log.stream });
}
