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

import { ShowEntity } from "src/entities/shows.entity";
import { UserEntity } from "src/entities/users.entity";
import { CreateShowDto, UpdateShowDto } from "src/dto/show.dto";
import { UserRole } from "src/common/constants/enums";

import { JwtAccessGuard } from "src/modules/auth/jwt/jwt.service";
import { Roles } from "src/common/custom-decorator/user-roles-guard";
import { RolesGuard } from "src/common/custom-decorator/user-roles-guard";
import { CurrentUser } from "src/common/custom-decorator/user-currentuser";

@Controller("show")
export class ShowController {
  constructor(private showService: ShowService) {}

  @Post("create")
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.HOST)
  @UsePipes(ValidationPipe)
  createShow(
    @Body() createShowDto: CreateShowDto,
    @CurrentUser() user: UserEntity
  ): Promise<ShowEntity> {
    return this.showService.createShow(createShowDto, user);
  }

  @Get(":id")
  @UseGuards(JwtAccessGuard)
  getShow(
    @Param("id") id: string
  ): Promise<ShowEntity[]> {
    const showId = parseInt(id);
    return this.showService.getShow(showId);
  }

  @Patch("update")
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.HOST)
  @UsePipes(ValidationPipe)
  updateShow(
    @Body() updateShowDto: UpdateShowDto,
    @CurrentUser() user: UserEntity
  ): Promise<ShowEntity> {
    return this.showService.updateShow(updateShowDto, user);
  }

  @Delete("delete")
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.HOST)
  deleteShow(
    @Param("id", ParseIntPipe) id
  ): Promise<void> {
    return this.showService.deleteShow(id);
  }
}
