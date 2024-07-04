import nodemailer from 'nodemailer';

import { Controller, Body, Post, HttpStatus, HttpException } from '@nestjs/common';

import { ENV } from '../../common/constants/env.constant';
import { AUTH_CONSTANT } from '../../common/constants/auth.constant';
import { MESSAGES } from '../../common/constants/message.constant';

// 이메일 인증 controller
@Controller('auth')
export class AuthEmailController {
  static codeNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static codeIssue() {
    return AuthEmailController.codeNumber(111111, 999999);
  }

  static expirationTime = 5 * 60 * 1000; // 5분 뒤 코드 인증 만료

  static isExpired(timestamp: number) {
    return Date.now() > timestamp + AuthEmailController.expirationTime;
  }

  static codes = {};

  static smtpTransport = nodemailer.createTransport({
    service: 'naver',
    auth: {
      user: ENV.MAIL_AUTH_USER,
      pass: ENV.MAIL_AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  @Post('send-email')
  async sendAuthEmail(@Body('email') email: string) {
    try {
      const verificationCode = AuthEmailController.codeIssue();
      const sendTime = new Date(Date.now()).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      });

      if (!email) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      AuthEmailController.codes[email] = {
        code: verificationCode,
        sendTime: sendTime,
      };

      const mailOptions = {
        from: AUTH_CONSTANT.AUTH_EMAIL.FROM,
        to: email,
        subject: AUTH_CONSTANT.AUTH_EMAIL.SUBJECT,
        html: `
          <p>${AUTH_CONSTANT.AUTH_EMAIL.HTML}</p> <br>
          <p>인증코드: ${verificationCode}</p>
          `,
      };

      AuthEmailController.smtpTransport.sendMail(mailOptions);

      console.log(AuthEmailController.codes[email].code);

      return {
        status: HttpStatus.OK,
        message: MESSAGES.AUTH.SIGN_UP.EMAIL.SUCCEED,
        data: AuthEmailController.codes,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGES.AUTH.SIGN_UP.EMAIL.FAIL,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
