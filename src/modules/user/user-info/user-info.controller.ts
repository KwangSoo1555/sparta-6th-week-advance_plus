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
    @RequestUserByJwt() userId: number
  ) {
    return this.userService.getUser(userId);
  }

  @Patch("update")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @RequestUserByJwt() userId: number
  ) {
    return this.userService.updateUser(updateUserDto, userId);
  }

  @Patch("permission")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  updatePermission(
    @Body() updatePermissionDto: UpdateUserPermissionDto,
    @RequestUserByJwt() userId: number
  ) {
    return this.userService.updatePermission(updatePermissionDto, userId);
  }
}
