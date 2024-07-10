import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from "@nestjs/common";

import { ReservationService } from "./reservation.service";

import { CreateReservationDto, UpdateReservationDto } from "src/dto/reservation.dto";

import { RequestUserByJwt } from "src/common/custom-decorator/user-request-jwt";
import { JwtAccessGuards } from "src/modules/auth/jwt/jwt.service";

@Controller("user")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post(":showId/:seatId")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Param("showId", ParseIntPipe) showId,
    @Param("seatId", ParseIntPipe) seatId,
    @RequestUserByJwt() user: { userId: number },
  ) {
    return this.reservationService.createReservation(
      createReservationDto,
      showId,
      seatId,
      user.userId,
    );
  }

  @Get(":reservationId")
  @UseGuards(JwtAccessGuards)
  getReservation(
    @Param("reservationId", ParseIntPipe) reservationId,
    @RequestUserByJwt() user: { userId: number },
  ) {
    return this.reservationService.getReservation(reservationId, user.userId);
  }

  @Patch(":reservationId")
  @UseGuards(JwtAccessGuards)
  @UsePipes(ValidationPipe)
  changeReservation(
    @Param("reservationId", ParseIntPipe) reservationId,
    @Body() updateReservationDto: UpdateReservationDto,
    @RequestUserByJwt() user: { userId: number },
  ) {
    return this.reservationService.changeReservation(
      updateReservationDto,
      reservationId,
      user.userId,
    );
  }

  @Delete(":reservationId")
  @UseGuards(JwtAccessGuards)
  cancelReservation(
    @Param("reservationId", ParseIntPipe) reservationId,
    @RequestUserByJwt() user: { userId: number },
  ) {
    return this.reservationService.cancelReservation(reservationId, user.userId);
  }
}
