import { Controller, Body, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  signUp(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
    @Body('provider') provider: string,
  ) {
    return this.authService.signUp(name, email, password, phone, provider);
  }
}
