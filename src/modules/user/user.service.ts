import { Injectable } from "@nestjs/common";

import { AuthRepository } from "src/modules/auth/auth-user/auth.repository";
// import { UserRepository } from "src/modules/user/user.repository";

import { UserEntity } from "src/entities/users.entity";
import { UpdateUserDto, UpdateUserPermissionDto } from "src/dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    private authRepository: AuthRepository,
    // private userRepository: UserRepository
  ) {}

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.authRepository.checkUser(null, userId);
    user.password = undefined;
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, userId: number): Promise<UserEntity> {
    return this.authRepository.updateUser(updateUserDto, userId);
  }

  async updatePermission(
    updatePermissionDto: UpdateUserPermissionDto,
    userId: number,
  ): Promise<UserEntity> {
    return this.authRepository.updatePermission(updatePermissionDto, userId);
  }
}
