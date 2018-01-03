import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global/global.module';

@Module({
  modules: [
    AuthModule,
    GlobalModule,
  ],
})
export class ApplicationModule {}