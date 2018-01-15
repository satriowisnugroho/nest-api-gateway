import { Module, Inject } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global/global.module';
import { UserModule } from './user/user.module';
import { BrokerModule } from './common/index';

@Module({
  imports: [
    // AuthModule,
    UserModule,
    // GlobalModule,
    BrokerModule
  ],
})
export class ApplicationModule {
  constructor(@Inject('Broker') private readonly broker){
    this.init();
  }

  async init() {
    await this.broker.start();
    await this.broker.repl();
  }
}