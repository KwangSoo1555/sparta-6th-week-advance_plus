import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "src/entities/users.entity";

export const RequestUserByJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
