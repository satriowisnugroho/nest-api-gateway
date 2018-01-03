import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from '../common/index';

@Module({
  components: [AuthService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '/auth/authorized', method: RequestMethod.ALL },
      { path: '/auth/logout', method: RequestMethod.GET },
    );
  }
}
