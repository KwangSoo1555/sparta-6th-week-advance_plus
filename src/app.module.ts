import { Module } from "@nestjs/common";
import { HelloController } from "./app.controller";

import { PrismaModule } from "src/database/prisma/prisma.module";
import { TypeOrmModule } from "src/database/typeorm/typeorm.module";

import { AuthModule } from "src/modules/auth/auth-user/auth.module";
import { AuthEmailModule } from "src/modules/auth/auth-email/auth-email.module";
import { JwtModule } from "src/modules/auth/jwt/jwt.module";
import { UserModule } from "src/modules/user/user.module";
import { ShowModule } from "src/modules/show/show.module";

@Module({
  imports: [
    TypeOrmModule, 
    PrismaModule, 
    AuthModule, 
    AuthEmailModule, 
    JwtModule, 
    ShowModule,
    UserModule
  ],
  controllers: [HelloController],
})
export class AppModule {}
