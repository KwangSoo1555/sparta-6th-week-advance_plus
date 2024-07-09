import { DataSource, Repository, DeleteResult } from "typeorm";
import { Injectable } from "@nestjs/common";

import { ReservationEntity } from "src/entities/reservation.entity";

@Injectable()
export class ReservationRepository extends Repository<ReservationEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReservationEntity, dataSource.manager);
  }

  async createReservation(showId: number, seatId: number, userId: number) {
    return this.dataSource.manager.createQueryBuilder(ReservationEntity, "reservation").insert().values({
      showId,
      seatId,
      userId,
    });
  }
}