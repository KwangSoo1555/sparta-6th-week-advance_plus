import nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

import { SendAuthEmailDto } from '../../dto/auth-email.dto';
import { MESSAGES } from '../../common/constants/message.constant';
import { AUTH_CONSTANT } from '../../common/constants/auth.constant';
import { ENV } from '../../common/constants/env.constant';

@Injectable()
export class AuthEmailService {
  smtpTransport = nodemailer.createTransport({
    service: 'naver',
    auth: {
      user: ENV.MAIL_AUTH_USER,
      pass: ENV.MAIL_AUTH_PASS,
    },
  });

  private codes = new Map<string, { code: number; timestamp: number }>();
  private expirationTime = 5 * 60 * 1000; // 5분 뒤 코드 인증 만료

  constructor() {
    console.log('AuthEmailService 인스턴스 생성됨');
  }

  codeNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  codeIssue() {
    return this.codeNumber(111111, 999999);
  }

  isExpired(timestamp: number) {
    return Date.now() > timestamp + this.expirationTime;
  }

  getCode(email: string) {
    console.log('getCode 호출:', this.codes);
    return this.codes.get(email);
  }

  async sendAuthEmail(
    sendAuthEmailDto: SendAuthEmailDto
  ) {
    const verificationCode = this.codeIssue();
    const timestamp = Date.now();
    const email = sendAuthEmailDto.email;

    const mailOptions = {
      from: AUTH_CONSTANT.AUTH_EMAIL.FROM,
      to: email,
      subject: AUTH_CONSTANT.AUTH_EMAIL.SUBJECT,
      html: `
        <p>${AUTH_CONSTANT.AUTH_EMAIL.HTML}</p> <br>
        <p>인증코드: ${verificationCode}</p>
        `,
    };

    this.codes.set(email, {
      code: verificationCode,
      timestamp,
    });

    console.log('auth-email 에서 코드 저장 확인:', this.codes.get(email)); // 디버깅 로그 추가

    await this.smtpTransport.sendMail(mailOptions);

    console.log('auth-email 에서 발송된 코드:', this.codes.get(email)?.code);

    const sendTime = new Date(timestamp).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });

    return {
      status: HttpStatus.OK,
      message: MESSAGES.AUTH.SIGN_UP.EMAIL.SUCCEED,
      data: {
        code: verificationCode,
        timestamp: sendTime,
      },
    };
  }
}