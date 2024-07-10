import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { JwtRepository } from "src/modules/auth/jwt/jwt.repository";
import { AuthUserRepository } from "src/modules/auth/auth-user/auth-user.repository";

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { AuthGuard } from "@nestjs/passport";

import { ENV } from "src/common/constants/env.constant";
import { MESSAGES } from "src/common/constants/message.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";

@Injectable()
export class JwtService {
  constructor(
    private jwtRepository: JwtRepository,
  ) {}

  async tokenReissue(userId: number, refreshToken: string, ip: string, userAgent: string) {

    // refresh token 을 가지고 있는 유저인지 확인
    const existingRefreshToken = await this.jwtRepository.checkRefreshToken(userId);
    if (!existingRefreshToken) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    // 제출한 refresh token 과 저장된 refresh token 이 일치하는지 확인
    const matchRefreshToken = await bcrypt.compare(refreshToken, existingRefreshToken.refreshToken);
    if (!matchRefreshToken) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    // access token 과 refresh token 을 새롭게 발급
    const reIssueAccessToken = jwt.sign(
      { userId },
      ENV.ACCESS_TOKEN_SECRET,
      { expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN },
    );

    const reIssueRefreshToken = jwt.sign(
      { userId },
      ENV.REFRESH_TOKEN_SECRET,
      { expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN },
    );

    const hashedReIssueRefreshToken = await bcrypt.hash(
      reIssueRefreshToken,
      AUTH_CONSTANT.HASH_SALT_ROUNDS,
    );

    await this.jwtRepository.storeRefreshToken(userId, hashedReIssueRefreshToken, ip, userAgent);

    return {
      accessToken: reIssueAccessToken,
      refreshToken: reIssueRefreshToken,
    };
  }
}

// Access token validation
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "access-token") {
  constructor(
    private authUserRepository: AuthUserRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    const { userId } = payload;

    const user = await this.authUserRepository.checkUser({ userId });
    if (!user) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    return user;
  }
}

// Refresh token validation
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "refresh-token") {
  constructor(
    private authUserRepository: AuthUserRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("REFRESH_TOKEN_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    const { userId } = payload;

    const user = await this.authUserRepository.checkUser({ userId });
    if (!user) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    return user;
  }
}

// 인증 가드를 설정하여 보호된 라우트에 접근할 때 JWT 토큰을 검증
@Injectable()
export class JwtAccessGuards extends AuthGuard("access-token") {}

@Injectable()
export class JwtRefreshGuards extends AuthGuard("refresh-token") {}