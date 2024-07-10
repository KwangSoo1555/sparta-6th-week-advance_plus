import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Headers,
  Ip,
} from "@nestjs/common";

import { JwtService } from "./jwt.service";

import { JwtRefreshGuards } from "./jwt.service";
import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";


@Controller("auth")
export class JwtController {
  constructor(private jwtService: JwtService) {}

  @Post("jwt-reissue")
  @UseGuards(JwtRefreshGuards)
  @UsePipes(ValidationPipe)
  tokenReissue(
    @RequestUserByJwt() userId: number,
    @Body("refreshToken") refreshToken: string,
    @Ip() ip: string,
    @Headers("user-agent") userAgent: string,
  ) {
    return this.jwtService.tokenReissue(userId, refreshToken, ip, userAgent);
  }
}
