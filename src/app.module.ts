import { Module } from '@nestjs/common';
import { HelloController } from './app.controller';

import { PrismaModule } from './database/prisma/prisma.module';
import { TypeOrmModule } from './database/typeorm/typeorm.module';

import { AuthModule } from './modules/auth/auth.module';
import { AuthEmailModule } from './modules/auth-email/auth-email.module';

@Module({
  imports: [TypeOrmModule, PrismaModule, AuthModule, AuthEmailModule],
  controllers: [HelloController],
})
export class AppModule {}
