import { Controller, Body, Res, HttpStatus, Next, Post } from '@nestjs/common';
import { Response, NextFunction } from 'express';

import nodemailer from 'nodemailer';

import { ENV } from '../../common/constants/env.constant';
import { AUTH_CONSTANT } from '../../common/constants/auth.constant';
import { MESSAGES } from '../../common/constants/message.constant';

@Controller('auth-email')

// 이메일 인증 controller
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

  @Post('/')
  async sendAuthEmail(
    @Body() body: { email: string },
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const verificationCode = AuthEmailController.codeIssue();
      const timestamp = Date.now();

      if (!body.email) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
        });
      }

      AuthEmailController.codes[body.email] = {
        code: verificationCode,
        timestamp,
      };
      const mailOptions = {
        from: AUTH_CONSTANT.AUTH_EMAIL.FROM,
        to: body.email,
        subject: AUTH_CONSTANT.AUTH_EMAIL.SUBJECT,
        html: `
          <p>${AUTH_CONSTANT.AUTH_EMAIL.HTML}</p> <br>
          <p>인증코드: ${verificationCode}</p>
          `,
      };

      AuthEmailController.smtpTransport.sendMail(mailOptions);

      console.log(AuthEmailController.codes[body.email].code);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: MESSAGES.AUTH.SIGN_UP.EMAIL.SUCCEED,
        data: AuthEmailController.codes,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: MESSAGES.AUTH.SIGN_UP.EMAIL.FAIL,
      });
      next(error);
    }
  }
}
