import { Injectable } from "@nestjs/common";

import { ReservationRepository } from "./reservation.repository";

import { ShowRepository } from "src/modules/show/show.repository";
import { SeatRepository } from "src/modules/seat/seat.repository";
import { AuthUserRepository } from "src/modules/auth/auth-user/auth-user.repository";

import { CreateReservationDto, UpdateReservationDto } from "src/dto/reservation.dto";

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
    showId: number,
    seatId: number,
    userId: number,
  ) {
    return this.reservationRepository.createReservation(
      createReservationDto,
      showId,
      seatId,
      userId,
    );
  }

  async getReservation(reservationId: number, userId: number) {
    return this.reservationRepository.getReservation(reservationId, userId);
  }

  async changeReservation(
    updateReservationDto: UpdateReservationDto,
    reservationId: number,
    userId: number,
  ) {
    return this.reservationRepository.changeReservation(
      updateReservationDto,
      reservationId,
      userId,
    );
  }

  async cancelReservation(
    reservationId: number,
    userId: number,
  ) {
    return this.reservationRepository.cancelReservation(
      reservationId,
      userId,
    );
  }
}
