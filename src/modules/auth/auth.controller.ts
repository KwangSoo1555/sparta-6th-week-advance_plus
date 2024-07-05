import { Controller, Post, Body, UsePipes, ValidationPipe } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { CreateSignUpDto, CreateSignInDto } from "src/dto/auth.dto";
import { UsersEntity } from "src/entities/users.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  @UsePipes(ValidationPipe)
  signUp(
    @Body() signUpDto: CreateSignUpDto
  ): Promise<UsersEntity> {
    return this.authService.signUp(signUpDto);
  }

  @Post("sign-in")
  @UsePipes(ValidationPipe)
  signIn(
    @Body() signInDto: CreateSignInDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
