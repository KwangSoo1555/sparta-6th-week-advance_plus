import { ConflictException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

import { MESSAGES } from 'src/common/constants/message.constant';
import { CreateSignUpDto } from 'src/dto/auth.dto';
import { AuthEntity } from 'src/entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}

  async checkUser(email: string): Promise<AuthEntity> {
    const user = await this.authRepository.findOne({ 
      where: { email } 
    });

    if (user.email) {
      throw new ConflictException(MESSAGES.AUTH.SIGN_UP.EMAIL.DUPLICATED);
    }
    if (user.name) {
      throw new ConflictException(MESSAGES.AUTH.SIGN_UP.NAME.DUPLICATED);
    }

    return user;
  }

  signUp(signUpDto: CreateSignUpDto): Promise<AuthEntity> {

    // 이미 존재하는 유저인지 확인
    if (this.checkUser(signUpDto.email)) {
      throw new ConflictException(MESSAGES.AUTH.SIGN_UP.EMAIL.DUPLICATED);
    }

    // 유저 생성 -> repository 호출
    return this.authRepository.signUp(signUpDto);
  }
}
