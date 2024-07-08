import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { UserEntity } from "src/entities/users.entity";
import { CreateSignUpDto } from "src/dto/auth.dto";
import { UpdateUserDto, UpdateUserPermissionDto } from "src/dto/user.dto";
import { checkUserType } from "src/common/costom-type/method-check-user";

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  async checkUser(
    email?: string, userId?: number
  ): Promise<UserEntity | null> {
    return await checkUserType.call(this, email, userId);
  }

  async signUp(signUpDto: CreateSignUpDto): Promise<UserEntity> {
    const user = this.create(signUpDto);

    await this.save(user);
    return user;
  }

  async updateUser(
    updateUserDto: UpdateUserDto, userId: number
  ): Promise<UserEntity> {
    await this.upsert(updateUserDto, {
      conflictPaths: ["userId"],
      skipUpdateIfNoValuesChanged: true,
    });

    const updatedUser = await this.findOne({ where: { userId } });

    return updatedUser;
  }

  async updatePermission(
    updateUserPermissionDto: UpdateUserPermissionDto, userId: number
  ): Promise<UserEntity> {
    await this.update({ userId }, updateUserPermissionDto);

    const updatedUser = await this.findOne({ where: { userId } });

    return updatedUser;
  } 
}
