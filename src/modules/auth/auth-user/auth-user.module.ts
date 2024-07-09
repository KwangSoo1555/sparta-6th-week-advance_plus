import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "src/modules/auth/jwt/jwt.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AccessTokenStrategy, RefreshTokenStrategy } from "src/modules/auth/jwt/jwt.service";

import { AuthEmailModule } from "src/modules/auth/auth-email/auth-email.module";

import { AuthRepository } from "src/modules/auth/auth-user/auth-user.repository";
import { AuthService } from "src/modules/auth/auth-user/auth-user.service";
import { AuthController } from "src/modules/auth/auth-user/auth-user.controller";

import { JwtRepository } from "src/modules/auth/jwt/jwt.repository";

import { UserEntity } from "src/entities/users.entity";
import { ENV } from "src/common/constants/env.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    NestJwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("ACCESS_TOKEN_SECRET", ENV.ACCESS_TOKEN_SECRET),
        signOptions: { expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN },
      }),
    }),
    NestJwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("REFRESH_TOKEN_SECRET", ENV.REFRESH_TOKEN_SECRET),
        signOptions: { expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule,
    AuthEmailModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [
    AuthService, 
    AuthRepository, 
    JwtRepository
  ],
})
export class AuthModule {}