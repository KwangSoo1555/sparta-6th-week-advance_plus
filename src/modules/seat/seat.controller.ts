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

import { SeatService } from "./seat.service";

import { CreateSeatDto, UpdateSeatDto } from "src/dto/seat.dto";
import { UserRole } from "src/common/constants/enums";

import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";
import { JwtAccessGuards } from "src/modules/auth/jwt/jwt.service";
import { RoleGuards } from "src/common/custom-decorator/user-roles-guard";

@Controller("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post(":showId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @RoleGuards(UserRole.HOST)
  @UsePipes(ValidationPipe)
  createSeat(
    @Body() createSeatDto: CreateSeatDto,
    @Param("showId", ParseIntPipe) showId: number,
    @RequestUserByJwt() userId: number
  ) {
    return this.seatService.createSeat(createSeatDto, showId, userId);
  }

  @Get(":seatId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @RoleGuards(UserRole.HOST)
  getSeatInfo(
    @Param("seatId", ParseIntPipe) seatId: number,
  ) {
    return this.seatService.getSeatInfo(seatId);
  }

  @Patch(":seatId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @RoleGuards(UserRole.HOST)
  @UsePipes(ValidationPipe)
  updateSeat(
    @Body() updateSeatDto: UpdateSeatDto,
    @Param("seatId", ParseIntPipe) seatId: number,
    @RequestUserByJwt() userId: number
  ) {
    return this.seatService.updateSeat(updateSeatDto, seatId, userId);
  }

  @Delete(":seatId")
  @UseGuards(JwtAccessGuards, RoleGuards)
  @RoleGuards(UserRole.HOST)
  deleteSeat(
    @Param("seatId", ParseIntPipe) seatId: number,
    @RequestUserByJwt() userId: number
  ) {
    return this.seatService.deleteSeat(seatId, userId);
  }
}
