import { Module } from '@nestjs/common';

import { PrismaModule } from './database/prisma/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { AuthEmailModule } from './modules/auth-email/auth-email.module';

@Module({
  imports: [PrismaModule, AuthModule, AuthEmailModule],
})
export class AppModule {}
