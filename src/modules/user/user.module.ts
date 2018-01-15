import {
  Module,
  MiddlewaresConsumer,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BrokerModule } from '../common/index';

@Module({
  imports: [BrokerModule],
  components: [UserService],
  controllers: [UserController],
})
export class UserModule {}
