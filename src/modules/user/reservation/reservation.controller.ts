import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { ReservationService } from "./reservation.service";

// import {} from "src/dto/user.dto";

import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";
import { JwtAccessGuards } from "src/modules/auth/jwt/jwt.service";

@Controller("user")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post(":showId/:seatId")
  @UseGuards(JwtAccessGuards)
  createReservation(
    @Param("showId") showId: number,
    @Param("seatId") seatId: number,
    @RequestUserByJwt() userId: number,
  ) {
    return this.reservationService.createReservation(showId, seatId, userId);
  }

  //   @Post(":showId")
  //   @UseGuards(JwtAccessGuards, RoleGuards)
  //   @RoleGuards(UserRole.HOST)
  //   @UsePipes(ValidationPipe)
  //   createSeat(
  //     @Body() createSeatDto: CreateSeatDto,
  //     @Param("showId", ParseIntPipe) showId: number,
  //     @RequestUserByJwt() userId: number
  //   ) {
  //     return this.seatService.createSeat(createSeatDto, showId, userId);
  //   }
}
