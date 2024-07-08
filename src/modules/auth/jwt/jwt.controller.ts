import { 
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Headers,
} from "@nestjs/common";

import { JwtService } from "src/modules/auth/jwt/jwt.service";

import { JwtRefreshGuard } from "src/modules/auth/jwt/jwt.service"; // 경로 수정

import { JwtEntity } from "src/entities/jwt.entity";
import { JwtDto } from "src/dto/jwt.dto";
import { ValidateRefreshTokenType } from "src/common/costom-type/validate-refresh-token";
import { UserEntity } from "src/entities/users.entity"
import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";

@Controller("auth")
export class JwtController {
  constructor(private jwtService: JwtService) {}

  @Post("jwt-reissue")
  @UseGuards(JwtRefreshGuard)
  @UsePipes(ValidationPipe)
  tokenReissue(
    @Headers("authorization") authorization: string,
    @RequestUserByJwt() userByUserEntity: UserEntity,
  ): Promise<JwtEntity> {
    const refreshToken = ValidateRefreshTokenType(authorization);
    console.log("JwtController: tokenReissue called with JwtDto:", refreshToken);

    const jwtDto = {
      refreshToken: refreshToken,
      userByUserEntity: userByUserEntity,
    };
    return this.jwtService.tokenReissue(jwtDto);
  }
}