import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";

import { ShowService } from "./show.service";

import { CreateShowDto, UpdateShowDto } from "src/dto/show.dto";
import { UserRole } from "src/common/constants/enums";

import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";
import { JwtAccessGuards } from "src/modules/auth/jwt/jwt.service";
import { RoleGuards } from "src/common/custom-decorator/user-roles-guard";

@Controller("show")
export class ShowController {
  constructor(private showService: ShowService) {}

  @Post()
  @UseGuards(JwtAccessGuards, RoleGuards)
  @RoleGuards(UserRole.HOST)
  @UsePipes(ValidationPipe)
  createShow(
    @Body() createShowDto: CreateShowDto,
  ) {
    return this.showService.createShow(createShowDto);
  }

  @Get()
  @UseGuards(JwtAccessGuards)
  getShowsAll() {
    return this.showService.getShowsAll();
  }

  @Get(":param")
  @UseGuards(JwtAccessGuards)
  getShowsDetailsByGenre(
    @Param("param") param: string
  ) {
    return this.showService.getShowsDetailsByGenre(param);
  }

  @Get(":showId")
  @UseGuards(JwtAccessGuards)
  getShowDetails(
    @Param("showId", ParseIntPipe) showId: number
  ) {
    return this.showService.getShowDetails(showId);
  }

  @Patch(":showId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @RoleGuards(UserRole.HOST)
  @UsePipes(ValidationPipe)
  updateShow(
    @Param("showId", ParseIntPipe) showId,
    @Body() updateShowDto: UpdateShowDto,
    @RequestUserByJwt() userId: number
  ) {
    return this.showService.updateShow(showId, userId, updateShowDto);
  }

  @Delete(":showId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @RoleGuards(UserRole.HOST)
  deleteShow(
    @Param("showId", ParseIntPipe) showId,
    @RequestUserByJwt() userId: number
  ) {
    return this.showService.deleteShow(showId, userId);
  }
}
