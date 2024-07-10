import { Module } from "@nestjs/common";
import { TypeOrmModule } from "src/database/typeorm/typeorm.module";

import { HelloController } from "./app.controller";

import { AuthUserModule } from "src/modules/auth/auth-user/auth-user.module";
import { AuthEmailModule } from "src/modules/auth/auth-email/auth-email.module";
import { JwtModule } from "src/modules/auth/jwt/jwt.module";
import { UserInfoModule } from "src/modules/user/user-info/user-info.module";
import { ShowModule } from "src/modules/show/show.module";
import { SeatModule } from "src/modules/seat/seat.module";
import { ReservationModule } from "src/modules/user/reservation/reservation.module";

@Module({
  imports: [
    TypeOrmModule,
    AuthUserModule,
    AuthEmailModule,
    JwtModule,
    ShowModule,
    UserInfoModule,
    SeatModule,
    ReservationModule,
  ],
  controllers: [HelloController],
})
export class AppModule {}
