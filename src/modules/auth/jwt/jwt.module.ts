import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";

import { JwtRepository } from "./jwt.repository";
import { JwtService } from "./jwt.service";
import { JwtController } from "./jwt.controller";

import { JwtEntity } from "src/entities/jwt.entity";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";

@Module({
  imports: [
    ConfigModule,
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
  ],
  controllers: [JwtController],
  providers: [JwtService, JwtRepository, ConfigService],
  exports: [JwtService, JwtRepository],
})
export class JwtModule {}
