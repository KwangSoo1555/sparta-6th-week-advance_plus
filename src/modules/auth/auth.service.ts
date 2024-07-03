import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private auth = [];

  signUp(
    name: string,
    email: string,
    password: string,
    phone: string,
    provider: string,
  ) {
    return this.auth;
  }
}
