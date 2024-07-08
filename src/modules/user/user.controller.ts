import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";

import { UserService } from "src/modules/user/user.service";

import { UpdateUserDto, UpdateUserPermissionDto } from "src/dto/user.dto";
import { UserEntity } from "src/entities/users.entity";

import { JwtAccessGuard } from "src/modules/auth/jwt/jwt.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  getUser(
    @RequestUserByJwt() user: UserEntity
  ): Promise<UserEntity> {
    return this.userService.getUser(user.userId);
  }

  @Patch("update")
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @RequestUserByJwt() user: UserEntity
  ): Promise<UserEntity> {
    return this.userService.updateUser(updateUserDto, user.userId);
  }

  @Patch("permission")
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  updatePermission(
    @Body() updatePermissionDto: UpdateUserPermissionDto,
    @RequestUserByJwt() user: UserEntity
  ): Promise<UserEntity> {
    return this.userService.updatePermission(updatePermissionDto, user.userId);
  }
}
