import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReservationRepository } from "./reservation.repository";
import { ReservationService } from "./reservation.service";
import { ReservationController } from "./reservation.controller";

import { AuthUserRepository } from "src/modules/auth/auth-user/auth-user.repository";
import { ShowRepository } from "src/modules/show/show.repository";
import { SeatRepository } from "src/modules/seat/seat.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationRepository,
      ShowRepository,
      SeatRepository,
      AuthUserRepository,
    ]),
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationRepository,
    ShowRepository,
    SeatRepository,
    AuthUserRepository,
  ],
})
export class ReservationModule {}
