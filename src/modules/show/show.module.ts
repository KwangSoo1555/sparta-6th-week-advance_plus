import { Module } from "@nestjs/common";

import { ShowController } from "./show.controller";
import { ShowService } from "./show.service";
import { ShowRepository } from "./show.repository";

@Module({
  controllers: [ShowController],
  providers: [ShowService, ShowRepository],
})
export class ShowModule {}
