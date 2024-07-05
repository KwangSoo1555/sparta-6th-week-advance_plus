import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { JwtModule } from "../jwt/jwt.module";
import { PassportModule } from "@nestjs/passport";
import { AccessTokenStrategy, RefreshTokenStrategy } from "../jwt/jwt.service";

import { AuthEmailModule } from "../auth-email/auth-email.module";

import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { JwtRepository } from "../jwt/jwt.repository";

import { UsersEntity } from "../../entities/users.entity";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";
import { ENV } from "src/common/constants/env.constant";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    NestJwtModule.register({
      global: true,
      secret: ENV.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule,
    NestJwtModule,
    AuthEmailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}