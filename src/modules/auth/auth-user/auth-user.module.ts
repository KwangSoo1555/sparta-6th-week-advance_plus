import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { JwtModule } from "src/modules/auth/jwt/jwt.module";
import { AuthEmailModule } from "src/modules/auth/auth-email/auth-email.module";

import { AuthUserRepository } from "./auth-user.repository";
import { AuthUserService } from "./auth-user.service";
import { AuthUserController } from "./auth-user.controller";

import { JwtRepository } from "src/modules/auth/jwt/jwt.repository";

import { UserEntity } from "src/entities/users.entity";

@Module({
  imports: [
    // 수정 후
    // PassportModule.register({ defaultStrategy: "jwt", session: false }),
    // NestJwtModule.registerAsync({
    //   global: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get("ACCESS_TOKEN_SECRET", ENV.ACCESS_TOKEN_SECRET),
    //     signOptions: { expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN },
    //   }),
    // }),
    // NestJwtModule.registerAsync({
    //   global: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get("REFRESH_TOKEN_SECRET", ENV.REFRESH_TOKEN_SECRET),
    //     signOptions: { expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN },
    //   }),
    // }),
    // TypeOrmModule.forFeature([UserEntity]),
    // 수정 후
    // PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => JwtModule),
    AuthEmailModule,
    ConfigModule,
  ],
  controllers: [AuthUserController],
  providers: [
    AuthUserService,
    AuthUserRepository,
    JwtRepository,
  ],
  exports: [
    AuthUserService,
    AuthUserRepository,
  ],
})
export class AuthUserModule {}