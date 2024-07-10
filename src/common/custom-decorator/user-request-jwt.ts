// JWT 로 요청한 유저 정보를 가져오는 데코레이터

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RequestUserByJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
