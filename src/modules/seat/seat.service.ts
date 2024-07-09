import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";

import { SeatRepository } from "./seat.repository";
import { ShowRepository } from "../show/show.repository";

import { SeatEntity } from "src/entities/seats.entity";
import { CreateSeatDto, UpdateSeatDto } from "src/dto/seat.dto";

@Injectable()
export class SeatService {
  constructor(
    private readonly seatRepository: SeatRepository,
    private readonly showRepository: ShowRepository,
  ) {}

  async createSeat(
    createSeatDto: CreateSeatDto,
    showId: number,
    userId: number,
  ): Promise<SeatEntity> {
    const isCorrectUserCreateShow = await this.showRepository.getShowDetails(showId);

    if (isCorrectUserCreateShow.userByUserEntity.userId !== userId)
      throw new ForbiddenException("You are not allowed to create this seat");

    return this.seatRepository.createSeat(createSeatDto);
  }

  async getSeatInfo(seatId: number): Promise<SeatEntity> {
    return this.seatRepository.getSeatInfo(seatId);
  }

  async updateSeat(
    updateSeatDto: UpdateSeatDto,
    seatId: number,
    userId: number,
  ): Promise<SeatEntity> {
    const isCorrectUserUpdateSeat = await this.seatRepository.getSeatInfo(seatId);

    // 좌석 수정 권한 체크
    if (isCorrectUserUpdateSeat.showByShowEntity.userByUserEntity.userId !== userId)
      throw new ForbiddenException("You are not allowed to update this seat");

    return this.seatRepository.updateSeat(updateSeatDto, seatId);
  }

  async deleteSeat(seatId: number, userId: number): Promise<void> {
    const seat = await this.seatRepository.getSeatInfo(seatId);

    // 좌석 삭제 권한 체크
    if (seat.showByShowEntity.userByUserEntity.userId !== userId)
      throw new ForbiddenException("You are not allowed to delete this seat");

    const deletedSeat = await this.seatRepository.deleteSeat(seatId);

    if (deletedSeat.affected === 0)
      throw new NotFoundException("Seat not found");
  }
}
