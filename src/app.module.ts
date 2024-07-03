import { Module } from '@nestjs/common';
import { HelloController } from './app.controller';

import { PrismaModule } from './database/prisma/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { AuthEmailModule } from './modules/auth-email/auth-email.module';

@Module({
  imports: [PrismaModule, AuthModule, AuthEmailModule],
  controllers: [HelloController],
})
export class AppModule {}
