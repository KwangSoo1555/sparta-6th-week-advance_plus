import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AuthRepository } from "./auth.repository";
import { JwtRepository } from "../jwt/jwt.repository";
import { AuthEmailService } from "../auth-email/auth-email.service";

import { CreateSignUpDto, CreateSignInDto } from "src/dto/auth.dto";
import { JwtDto } from "src/dto/jwt.dto";
import { UsersEntity } from "src/entities/users.entity";
import { MESSAGES } from "src/common/constants/message.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";
import { ENV } from "src/common/constants/env.constant";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    @InjectRepository(JwtRepository)
    private jwtRepository: JwtRepository,
    private authEmailService: AuthEmailService,
  ) {
    console.log('AuthService 인스턴스 생성됨');
  }

  async checkUser(email: string): Promise<UsersEntity> {
    return this.authRepository.checkUser(email);
  }

  async signUp(
    signUpDto: CreateSignUpDto
  ): Promise<UsersEntity> {
    const { email, password, verificationCode } = signUpDto;

    // 이메일 인증 코드 확인
    const sendedEmailCode = this.authEmailService.getCode(email);
    console.log('auth 에서 발송된 코드:', sendedEmailCode);
    console.log('auth 에서 제출된 코드:', verificationCode);
    if (
      !sendedEmailCode ||
      this.authEmailService.isExpired(sendedEmailCode.timestamp) ||
      sendedEmailCode.code !== verificationCode
    )
      throw new BadRequestException(MESSAGES.AUTH.SIGN_UP.EMAIL.VERIFICATION_CODE.INCONSISTENT);

    // 이미 존재하는 유저인지 확인
    const existingUser = await this.checkUser(email);
    if (existingUser) 
      throw new ConflictException(MESSAGES.AUTH.SIGN_UP.EMAIL.DUPLICATED);

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, AUTH_CONSTANT.HASH_SALT_ROUNDS);

    // 유저 생성 -> 비밀번호 해싱 적용
    const signUpUser = await this.authRepository.signUp({
      ...signUpDto,
      password: hashedPassword,
    });

    // 비밀번호 필드를 undefined로 설정
    signUpUser.password = undefined;

    return signUpUser;
  }

  async signIn(
    signInDto: CreateSignInDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInDto;

    const user = await this.checkUser(email);

    // 유저 존재 여부 확인
    if (!user) throw new NotFoundException(MESSAGES.AUTH.SIGN_IN.EMAIL.NOT_FOUND);

    // 비밀번호 일치 여부 확인
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException(MESSAGES.AUTH.SIGN_IN.PASSWORD.INCONSISTENT);

    // JWT 발급
    const payload = { userId: user.userId };

    const accessToken = jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
      expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
      expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN,
    });

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, AUTH_CONSTANT.HASH_SALT_ROUNDS);

    // hashed refresh token 을 jwt entity 에 저장
    const jwtDto: JwtDto = {
      refreshToken: hashedRefreshToken,
      ip: "ip",
      userAgent: "userAgent",
    };
    await this.jwtRepository.refreshTokenStore({
      ...jwtDto,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}