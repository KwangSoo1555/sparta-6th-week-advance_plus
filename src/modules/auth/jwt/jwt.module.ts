import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthUserModule } from "../auth-user/auth-user.module";

import { JwtRepository } from "./jwt.repository";
import { JwtService } from "./jwt.service";
import { JwtController } from "./jwt.controller";
// nest 에서는 jwt.servcie 가 아니라 jwt.strategy 파일을 따로 분리해서 적용하는 것 같다.
import { AccessTokenStrategy, RefreshTokenStrategy } from "./jwt.service";

import { JwtEntity } from "src/entities/jwt.entity";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    NestJwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
        signOptions: { expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN },
      }),
    }),
    NestJwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("REFRESH_TOKEN_SECRET"),
        signOptions: { expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN },
      }),
    }),
    TypeOrmModule.forFeature([JwtEntity]),
    ConfigModule,
    forwardRef(() => AuthUserModule),
  ],
  controllers: [JwtController],
  providers: [
    JwtService,
    JwtRepository,
    ConfigService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [
    JwtService,
    JwtRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class JwtModule {}