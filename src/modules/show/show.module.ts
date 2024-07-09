import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ShowController } from "./show.controller";
import { ShowService } from "./show.service";
import { ShowRepository } from "./show.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ShowRepository])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
