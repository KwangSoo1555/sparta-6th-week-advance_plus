import {
  Controller,
  Body,
  Get,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { UserService } from "src/modules/user/user-info/user-info.service";

import { UpdateUserDto, UpdateUserPermissionDto } from "src/dto/user.dto";

import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";
import { JwtAccessGuards } from "src/modules/auth/jwt/jwt.service";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get("me")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  getUser(
    @RequestUserByJwt() user: { userId: number }
  ) {
    console.log("User ID:", user.userId);
    return this.userService.getUser({ userId: user.userId });
  }

  @Patch("update")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @RequestUserByJwt() user: { userId: number }
  ) {
    return this.userService.updateUser(updateUserDto, user.userId);
  }

  @Patch("permission")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  updatePermission(
    @Body() updatePermissionDto: UpdateUserPermissionDto,
    @RequestUserByJwt() user: { userId: number }
  ) {
    return this.userService.updatePermission(updatePermissionDto, user.userId);
  }
}
