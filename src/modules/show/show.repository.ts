import { DataSource, Repository, DeleteResult } from "typeorm";
import { Injectable } from "@nestjs/common";

import { ShowEntity } from "src/entities/shows.entity";
import { CreateShowDto, UpdateShowDto } from "src/dto/show.dto";

@Injectable()
export class ShowRepository extends Repository<ShowEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ShowEntity, dataSource.manager);
  }

  async createShow(createShowDto: CreateShowDto): Promise<ShowEntity> {
    const show = this.create(createShowDto);

    return this.save(show);
  }

  async getShowsAll(): Promise<ShowEntity[]> {
    return this.find({
      select: {
        title: true,
        description: true,
        genre: true,
        actor: true,
      },
    });
  }

  async getShowsDetailsByGenre(genre: string): Promise<ShowEntity[]> {
    return this.find({
      where: { genre },
      select: {
        title: true,
        description: true,
        genre: true,
        actor: true,
      },
    });
  }

  async getShowDetails(showId: number): Promise<ShowEntity> {
    return this.findOne({ where: { showId: showId } });
  }

  async updateShow(updateShowDto: UpdateShowDto, showId: number): Promise<ShowEntity> {
    await this.update({ showId: showId }, updateShowDto);

    const updatedShow = await this.findOne({ where: { showId: showId } });

    return updatedShow;
  }

  async deleteShow(showId: number): Promise<DeleteResult> {
    return this.delete({ showId: showId });
  }
}
