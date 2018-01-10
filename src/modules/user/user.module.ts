import {
  Module,
  MiddlewaresConsumer,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BrokerProviders } from '../common/providers/broker.providers';

@Module({
  components: [UserService, ...BrokerProviders],
  controllers: [UserController],
  exports: [...BrokerProviders],
})
export class UserModule {}
