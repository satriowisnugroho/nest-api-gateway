import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global/global.module';
import { BrokerProviders } from './common/index';

@Module({
  modules: [
    AuthModule,
    GlobalModule,
  ],
  components: [...BrokerProviders],
  exports: [...BrokerProviders],
})
export class ApplicationModule {}