import { Module } from "@nestjs/common";

import { AuthEmailController } from "src/modules/auth/auth-email/auth-email.controller";
import { AuthEmailService } from "src/modules/auth/auth-email/auth-email.service";

@Module({
  controllers: [AuthEmailController],
  providers: [AuthEmailService],
  exports: [AuthEmailService],
})
export class AuthEmailModule {}
