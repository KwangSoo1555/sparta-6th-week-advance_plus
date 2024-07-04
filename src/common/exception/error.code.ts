import { HttpStatus } from "@nestjs/common";

class ErrorCodeVo {
    constructor(status, message) {
      this.status = status;
      this.message = message;
    }

    readonly status;
    readonly message;
  
  }
  
  export type ErrorCode = ErrorCodeVo;
  
  // 아래에 에러코드 값 객체를 생성
  // Create an error code instance below.
  export const ENTITY_NOT_FOUND = new ErrorCodeVo(HttpStatus.NOT_FOUND, 'Entity Not Found');