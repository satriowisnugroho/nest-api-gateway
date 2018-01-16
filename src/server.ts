import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as Raven from 'raven';
import * as cors from 'cors';
import * as argv from 'minimist';
import { random } from 'lodash';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import {
  LoggingInterceptor,
  TransformInterceptor,
  HttpExceptionFilter,
  loggerMiddleware,
} from './modules/common/index';

dotenv.config();
Raven.config(process.env.SENTRY_DSN).install();
const arg = argv(process.argv.slice(2));
const port = arg.port || random(50000, 65000);

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(cors());
  app.use(Raven.requestHandler());
  app.use(loggerMiddleware());
  app.use(bodyParser.json());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );
  app.use(Raven.errorHandler());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
}
bootstrap().then(() => console.log(`Api Gateway is listening on port ${port}`));