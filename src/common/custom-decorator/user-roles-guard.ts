// roles 데코레이터 정의 후 RolesGuard 정의

import { SetMetadata } from '@nestjs/common';

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return roles.includes(user.role);
  } 
}

// 위에서 정의한 RolesGuard를 사용하기 위해 아래와 같이 사용해야 함
// @UseGuards(RolesGuard)
// @Roles('HOST')
// @UseGuards(RolesGuard)
// @Roles('USER')