import { DataSource, Repository, DeleteResult } from "typeorm";
import { Injectable } from "@nestjs/common";

import { ReservationEntity } from "src/entities/reservation.entity";
import { CreateReservationDto, UpdateReservationDto } from "src/dto/reservation.dto";

@Injectable()
export class ReservationRepository extends Repository<ReservationEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReservationEntity, dataSource.manager);
  }

  async createReservation(
    createReservationDto: CreateReservationDto,
    showId: number,
    seatId: number,
    userId: number,
  ): Promise<ReservationEntity> {
    const reservation = this.create(createReservationDto);

    return this.save(reservation);
  }

  async getReservation(reservationId: number, userId: number): Promise<ReservationEntity> {
    return this.findOne({ where: { reservationId } });
  }

  async changeReservation(
    updateReservationDto: UpdateReservationDto,
    reservationId: number,
    userId: number,
  ) {
    return this.update(reservationId, updateReservationDto);
  }

  async cancelReservation(reservationId: number, userId: number): Promise<DeleteResult> {
    return this.delete(reservationId);
  }
}
