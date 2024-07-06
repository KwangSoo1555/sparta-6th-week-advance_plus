import { 
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Ip,
  Headers,
} from "@nestjs/common";

import { AuthService } from "src/modules/auth/auth-user/auth.service";

import { CreateSignUpDto, CreateSignInDto } from "src/dto/auth.dto";
import { UserEntity } from "src/entities/users.entity";
import { JwtEntity } from "src/entities/jwt.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  @UsePipes(ValidationPipe)
  signUp(
    @Body() signUpDto: CreateSignUpDto
  ): Promise<UserEntity> {
    return this.authService.signUp(signUpDto);
  }

  @Post("sign-in")
  @UsePipes(ValidationPipe)
  signIn(
    @Ip() ip: string,
    @Headers("user-agent") userAgent: string,
    @Body() signInDto: CreateSignInDto,
  ): Promise<JwtEntity> {
    return this.authService.signIn(signInDto, ip, userAgent);
  }
}
