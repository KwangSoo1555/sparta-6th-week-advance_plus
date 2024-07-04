import { AUTH_CONSTANT } from './auth.constant';

export const MESSAGES = {
  AUTH: {
    COMMON: {
      NAME: {
        REQURIED: '이름을 입력해 주세요.',
        DUPLICATED: '이미 존재 하는 사용자입니다.',
      },
      EMAIL: {
        BASE: '이메일은 문자열입니다.',
        REQUIRED: '이메일을 입력해 주세요.',
        INVALID_FORMAT: '이메일 형식이 올바르지 않습니다.',
        DUPLICATED: '이미 존재 하는 사용자입니다.',
      },
      PASSWORD: {
        REQURIED: '비밀번호를 입력해 주세요.',
        MIN_LENGTH: `비밀번호는 ${AUTH_CONSTANT.PASSWORD_MIN_LENGTH}자리 이상이어야 합니다.`,
      },
      PASSWORD_CONFIRM: {
        REQURIED: '비밀번호 확인을 입력해 주세요.',
        NOT_MACHTED_WITH_PASSWORD: '입력 한 두 비밀번호가 일치하지 않습니다.',
      },
      CURRENT_PASSWORD: {
        REQURIED: '현재 비밀번호를 입력해 주세요.',
        NOT_MACHTED_WITH_PASSWORD:
          '현재 비밀번호와 기존 비밀번호가 일치하지 않습니다.',
      },
      NEW_PASSWORD: {
        REQURIED: '새로운 비밀번호를 입력해 주세요.',
        NEW_PASSWORD_EQUAL_CURRENT_PASSWORD:
          '현재 비밀번호와 새로운 비밀번호는 같을 수 없습니다.',
      },
      PHONE: {
        BASE: '전화 번호는 문자열입니다.',
        REQURIED: '전화 번호를 입력해 주세요.',
        INVALID_FORMAT: '전화 번호 형식이 올바르지 않습니다.',
      },
      ADDRESS: {
        BASE: '주소는 문자열입니다.',
        REQURIED: '주소를 입력해 주세요.',
        INVALID_FORMAT: '주소 형식이 올바르지 않습니다.',
      },
      UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',
      JWT: {
        NO_TOKEN: '인증 정보가 없습니다.',
        NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
        EXPIRED: '인증 정보가 만료되었습니다.',
        NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        INVALID: '인증 정보가 유효하지 않습니다.',
      },
    },
    SIGN_UP: {
      EMAIL: {
        DUPLICATED: '이메일이 이미 존재합니다.',
        FAIL: '메일 전송에 실패했습니다.',
        SUCCEED: '메일 전송에 성공했습니다.',
      },
      NAME: {
        DUPLICATED: '별명이 이미 존재합니다.',
      },
      VERIFICATION_CODE: {
        BASE: '이메일 인증 코드는 정수입니다.',
        REQUIRED: '이메일 인증 코드를 입력해 주세요.',
        INCONSISTENT: '발송된 인증 코드와 다릅니다.',
        EXPIRED: '메일 인증이 만료되었습니다.',
        SUCCEED: '메일 인증이 완료되었습니다.',
      },
      SUCCEED: '회원가입에 성공했습니다.',
    },
    SIGN_IN: {
      SUCCEED: '로그인에 성공했습니다.',
    },
    SIGN_OUT: {
      SUCCEED: '로그 아웃에 성공했습니다.',
    },
    REISSUE_TOKEN: {
      SUCCEED: '토큰 재발급에 성공했습니다.',
    },
    PASSPORT: {
      COMMON: {
        FAIL: '로그인에 실패했습니다.',
      },
      NAVER: {
        SUCCEED: '네이버 로그인에 성공했습니다.',
      },
    },
  },
  USERS: {
    READ_ME: {
      SUCCEED: '내 정보 조회에 성공했습니다.',
    },
    UPDATE_ME: {
      SUCCEED: '내 정보 수정에 성공했습니다.',
    },
    COMMON: {
      NOT_FOUND: '유저가 존재하지 않습니다.',
    },
    POINT: {
      NOT_ENOUGH_POINT: '포인트가 충분하지 않습니다.',
    },
  },
};
