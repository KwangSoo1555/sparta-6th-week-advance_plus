import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatRepository } from './seat.repository';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';

import { ShowRepository } from 'src/modules/show/show.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SeatRepository, ShowRepository])],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
