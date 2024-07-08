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

  async getShow(showId: number): Promise<ShowEntity[]> {
    return this.find({ where: { showId } });
  }

  async updateShow(updateShowDto: UpdateShowDto): Promise<ShowEntity> {
    const show = this.create(updateShowDto);

    return this.save(show);
  }

  async deleteShow(showId: number): Promise<DeleteResult> {
    return this.delete({ showId });
  }
}
