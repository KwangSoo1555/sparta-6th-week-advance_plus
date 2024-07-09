import { Module } from '@nestjs/common';

import { ReservationController } from 'src/modules/user/reservation/reservation.controller';
import { ReservationService } from 'src/modules/user/reservation/reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class UserShowReservationModule {}
