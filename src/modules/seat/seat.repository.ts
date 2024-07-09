import { DataSource, Repository, DeleteResult } from "typeorm";
import { Injectable } from "@nestjs/common";

import { SeatEntity } from "src/entities/seats.entity";
import { CreateSeatDto, UpdateSeatDto } from "src/dto/seat.dto";

@Injectable()
export class SeatRepository extends Repository<SeatEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SeatEntity, dataSource.manager);
  }

  async createSeat(createSeatDto: CreateSeatDto): Promise<SeatEntity> {
    const seat = this.create(createSeatDto);

    return this.save(seat);
  }

  async getSeatInfo(seatId: number): Promise<SeatEntity> {
    return this.findOne({ where: { seatId: seatId } });
  }

  async updateSeat(updateSeatDto: UpdateSeatDto, seatId: number): Promise<SeatEntity> {
    await this.update({ seatId: seatId }, updateSeatDto);

    const updatedSeat = await this.findOne({ where: { seatId: seatId } });

    return updatedSeat;
  }

  async deleteSeat(seatId: number): Promise<DeleteResult> {
    return this.delete({ seatId: seatId });
  }
}
