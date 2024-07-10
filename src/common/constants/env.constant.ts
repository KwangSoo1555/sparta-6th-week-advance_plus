import 'dotenv/config';

export const ENV = {
  // 서버 포트
  SERVER_PORT: process.env.SERVER_PORT,

  // MySQL 연결 정보
  MYSQL_URI: process.env.DATABASE_URL,

  // JWT 관련
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

  // nodemailer 인증 관련
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_SECURE: process.env.MAIL_SECURE,
  MAIL_AUTH_USER: process.env.MAIL_AUTH_USER,
  MAIL_AUTH_PASS: process.env.MAIL_AUTH_PASS,

  // AWS S3 관련
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  AWS_BUCKET: process.env.AWS_BUCKET,

  // passport naver 로그인 관련
  NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
  NAVER_CALLBACK_URL: process.env.NAVER_CALLBACK_URL,
};
