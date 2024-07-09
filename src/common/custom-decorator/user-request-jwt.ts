// 요청에서 JWT로 보낸 유저 정보를 가져오는 데코레이터

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "src/entities/users.entity";

export const RequestUserByJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
