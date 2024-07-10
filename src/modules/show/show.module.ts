import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ShowRepository } from "./show.repository";
import { ShowService } from "./show.service";
import { ShowController } from "./show.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ShowRepository])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
