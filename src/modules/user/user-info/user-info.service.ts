import { Injectable } from "@nestjs/common";

import { AuthRepository } from "src/modules/auth/auth-user/auth-user.repository";

import { UpdateUserDto, UpdateUserPermissionDto } from "src/dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    private authRepository: AuthRepository,
  ) {}

  async getUser(userId: number) {
    const user = await this.authRepository.checkUser(null, userId);
    user.password = undefined;
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, userId: number) {
    return this.authRepository.updateUser(updateUserDto, userId);
  }

  async updatePermission(
    updateUserPermissionDto: UpdateUserPermissionDto,
    userId: number,
  ) {
    return this.authRepository.updatePermission(updateUserPermissionDto, userId);
  }
}
