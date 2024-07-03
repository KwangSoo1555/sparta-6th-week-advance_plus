import { Module } from '@nestjs/common';
import { AuthEmailController } from './auth-email.controller';

@Module({
  controllers: [AuthEmailController],
})
export class AuthEmailModule {}
