import { Injectable } from "@nestjs/common";

import { AuthUserRepository } from "src/modules/auth/auth-user/auth-user.repository";

import { UpdateUserDto, UpdateUserPermissionDto } from "src/dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    private authUserRepository: AuthUserRepository,
  ) {}

  async getUser({ userId }: { userId: number }) {
    const user = await this.authUserRepository.checkUser({ userId });
    user.password = undefined;
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, userId: number) {
    return this.authUserRepository.updateUser(updateUserDto, userId);
  }

  async updatePermission(
    updateUserPermissionDto: UpdateUserPermissionDto,
    userId: number,
  ) {
    return this.authUserRepository.updatePermission(updateUserPermissionDto, userId);
  }
}
