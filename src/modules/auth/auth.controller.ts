import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateSignUpDto } from 'src/dto/auth.dto';
import { AuthEntity } from 'src/entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(
    @Body() signUpDto: CreateSignUpDto
  ): Promise <AuthEntity> {
    return this.authService.signUp(signUpDto);
  }
}
