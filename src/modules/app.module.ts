import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global/global.module';
import { UserModule } from './user/user.module';

@Module({
  modules: [
    AuthModule,
    UserModule,
    GlobalModule,
  ],
})
export class ApplicationModule {}