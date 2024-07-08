import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";

import { ShowRepository } from "src/modules/show/show.repository";

import { ShowEntity } from "src/entities/shows.entity";
import { UserEntity } from "src/entities/users.entity";
import { CreateShowDto, UpdateShowDto } from "src/dto/show.dto";
import { UserRole } from "src/common/constants/enums";

@Injectable()
export class ShowService {
  constructor(
    private readonly showRepository: ShowRepository,
  ) {}

  async createShow(createShowDto: CreateShowDto, user: UserEntity): Promise<ShowEntity> {
    if (!user || user.role !== UserRole.HOST)
      throw new UnauthorizedException("You do not have permission to create a show.");

    const show = this.showRepository.createShow(createShowDto);
    return show;
  }

  async getShow(showId: number): Promise<ShowEntity[]> {
    return this.showRepository.getShow(showId);
  }

  async updateShow(updateShowDto: UpdateShowDto, user: UserEntity): Promise<ShowEntity> {
    return this.showRepository.updateShow(updateShowDto);
  }

  async deleteShow(showId: number): Promise<void> {
   const show = await this.showRepository.deleteShow(showId);

    if(show.affected === 0) {
      throw new NotFoundException("Show not found");
    }
  }
}
