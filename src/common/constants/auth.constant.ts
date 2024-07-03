export const AUTH_CONSTANT = {
  ACCESS_TOKEN_EXPIRES_IN: '12h',
  REFRESH_TOKEN_EXPIRES_IN: '7d',

  HASH_SALT_ROUNDS: 10,
  // 유효성 검사시 비밀번호 최소 길이
  PASSWORD_MIN_LENGTH: 6,
  // 유효성 검사시 이메일 형식
  TLDS: ['com', 'net', 'kr'],
  //유효성 검사시 최소 도메인 요소
  MIN_DOMAIN_SEGMENTS: 2,
  // 이메일 인증 관련 상수
  AUTH_EMAIL: {
    FROM: process.env.MAIL_AUTH_USER,
    SUBJECT: '인증 관련 메일입니다.',
    HTML: '인증번호입니다.',
  },
  PASSPORT: {
    COMMON: {
      FAILURE_REDIRECT: '/api/auth/fail',
    },
    NAVER: {
      NAME: 'naver',
      OAUTH: '/naver/oauth',
    },
  },
};
