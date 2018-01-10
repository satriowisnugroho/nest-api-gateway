import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from '../common/index';
import { BrokerProviders } from '../common/providers/broker.providers';

@Module({
  components: [AuthService, ...BrokerProviders],
  controllers: [AuthController],
  exports: [...BrokerProviders],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '/auth/authorized', method: RequestMethod.ALL },
      { path: '/auth/logout', method: RequestMethod.GET },
    );
  }
}
