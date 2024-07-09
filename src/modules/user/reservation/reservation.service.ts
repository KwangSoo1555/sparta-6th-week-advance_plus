import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async createReservation(showId: number, seatId: number, userId: number) {
    return this.reservationRepository.createReservation(showId, seatId, userId);
  }
}
