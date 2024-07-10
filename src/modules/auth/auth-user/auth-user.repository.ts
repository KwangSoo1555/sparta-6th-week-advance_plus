import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { UserEntity } from "src/entities/users.entity";
import { CreateSignUpDto } from "src/dto/auth.dto";
import { UpdateUserDto, UpdateUserPermissionDto } from "src/dto/user.dto";

@Injectable()
export class AuthUserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  async checkUser(
    params: { email?: string, userId?: number }
  ) {
    return this.findOne({ where: { ...params } });
  }

  async signUp(
    signUpDto: CreateSignUpDto
  ) {
    const user = this.create(signUpDto);

    await this.save(user);
    return user;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userId: number,
  ) {
    await this.upsert(updateUserDto, {
      conflictPaths: ["userId"],
      skipUpdateIfNoValuesChanged: true,
    });

    const updatedUser = await this.findOne({ where: { userId } });

    return updatedUser;
  }

  async updatePermission(
    updateUserPermissionDto: UpdateUserPermissionDto, userId: number
  ) {
    await this.update({ userId }, updateUserPermissionDto);

    const updatedUser = await this.findOne({ where: { userId }, select: { role : true } });

    return updatedUser;
  } 
}
