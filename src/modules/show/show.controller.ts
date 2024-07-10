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
import { RoleGuards } from "src/common/custom-decorator/user-roles-guard";
import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";
import { JwtAccessGuards } from "src/modules/auth/jwt/jwt.service";

@Controller("show")
export class ShowController {
  constructor(private showService: ShowService) {}

  @Post()
  @UseGuards(JwtAccessGuards, RoleGuards)
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
    @Param("showId", ParseIntPipe) showId
  ) {
    return this.showService.getShowDetails(showId);
  }

  @Patch(":showId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @UsePipes(ValidationPipe)
  updateShow(
    @Param("showId", ParseIntPipe) showId,
    @Body() updateShowDto: UpdateShowDto,
    @RequestUserByJwt() user: { userId: number }
  ) {
    return this.showService.updateShow(showId, user.userId, updateShowDto);
  }

  @Delete(":showId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  deleteShow(
    @Param("showId", ParseIntPipe) showId,
    @RequestUserByJwt() user: { userId: number }
  ) {
    return this.showService.deleteShow(showId, user.userId);
  }
}
