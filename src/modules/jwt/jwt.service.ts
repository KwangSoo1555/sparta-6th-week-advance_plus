import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { JwtRepository } from "./jwt.repository";

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { AuthGuard } from "@nestjs/passport";

import { JwtDto } from "src/dto/jwt.dto";
import { JwtEntity } from "src/entities/jwt.entity";
import { MESSAGES } from "src/common/constants/message.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";
import { ENV } from "src/common/constants/env.constant";

@Injectable()
export class JwtService {
  constructor(
    @InjectRepository(JwtRepository)
    private jwtRepository: JwtRepository,
  ) {}

  async tokenReissue(jwtDto: JwtDto): Promise<JwtEntity> {
    const { refreshToken } = jwtDto;

    const decodedRefreshToken = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET) as JwtPayload;
    const { userId } = decodedRefreshToken;

    // DB 에 저장되어 있는 refresh token 호출
    const checkJwt = await this.jwtRepository.checkJwt(userId);
    if (!checkJwt) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    // 제출한 refresh token 과 DB 에 저장되어 있는 refresh token 이 일치하는지 확인
    const isRefreshTokenValid = await bcrypt.compare(refreshToken, checkJwt.refreshToken);
    if (!isRefreshTokenValid) throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);

    // 새로운 token 생성
    const reIssueAccessToken = jwt.sign({ userId }, ENV.ACCESS_TOKEN_SECRET, {
      expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN,
    });
    const reIssueRefreshToken = jwt.sign({ userId }, ENV.REFRESH_TOKEN_SECRET, {
      expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN,
    });

    // 재발급한 refresh token 을 해싱하여 DB 에 저장
    const hashedReIssueRefreshToken = await bcrypt.hash(
      reIssueRefreshToken,
      AUTH_CONSTANT.HASH_SALT_ROUNDS,
    );

    await this.jwtRepository.tokenReissue({
      refreshToken: hashedReIssueRefreshToken,
    });

    return {
      accessToken: reIssueAccessToken,
      refreshToken: reIssueRefreshToken,
    } as unknown as JwtEntity;
  }
}

// Access token validation
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "access-token") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV.ACCESS_TOKEN_SECRET,
    });
  }

  //   async validate(payload: JwtPayload) {
  //     const { userId } = payload;
  //     const user = await this.userRepository.findOne({ where: { id: userId } });
  //     if (!user) {
  //       throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);
  //     }
  //     return user;
  //   }
}

// Refresh token validation
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "refresh-token") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV.REFRESH_TOKEN_SECRET,
    });
  }

  //   async validate(payload: JwtPayload) {
  //     const { userId } = payload;
  //     const user = await this.userRepository.findOne({ where: { id: userId } });
  //     if (!user) {
  //       throw new UnauthorizedException(MESSAGES.AUTH.COMMON.JWT.INVALID);
  //     }
  //     return user;
  //   }
}

// 인증 가드를 설정하여 보호된 라우트에 접근할 때 JWT 토큰을 검증
@Injectable()
export class JwtAccessGuard extends AuthGuard("access-token") {}

@Injectable()
export class JwtRefreshGuard extends AuthGuard("refresh-token") {}
