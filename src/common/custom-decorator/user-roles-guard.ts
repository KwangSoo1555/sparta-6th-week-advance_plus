// user role enum 정의 후 RolesGuard 정의

import { Injectable, CanActivate, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/common/constants/enums";

export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);

@Injectable()
export class RoleGuards implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // UserRole.HOST가 포함된 경우에만 작동하도록 수정
    if (!user.roles?.includes(UserRole.HOST)) {
      return false;
    }

    return roles.some((role) => user.roles?.includes(role));
  }
}

// 위에서 정의한 RolesGuard를 사용하기 위해 아래와 같이 사용해야 함
// @UseGuards(RolesGuard)
// @Roles('HOST')
// @UseGuards(RolesGuard)
// @Roles('USER')
