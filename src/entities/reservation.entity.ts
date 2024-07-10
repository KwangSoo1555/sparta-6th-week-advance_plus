import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { UserEntity } from "./users.entity";
import { ShowEntity } from "./shows.entity";
import { SeatEntity } from "./seats.entity";

import { SeatGrade } from "src/common/constants/enums";

@Entity("reservation")
export class ReservationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "reservation_id" })
  reservationId: number;

  @ManyToOne(() => UserEntity, (user) => user.reservation)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "userId",
  })
  user: UserEntity;

  @ManyToOne(() => ShowEntity, (show) => show.reservation)
  @JoinColumn({
    name: "show_id",
    referencedColumnName: "showId",
  })
  show: ShowEntity;

  @ManyToOne(() => SeatEntity, (seat) => seat.reservation)
  @JoinColumn({
    name: "seat_id",
    referencedColumnName: "seatId",
  })
  seat: SeatEntity;

  @Column({ type: "enum", enum: SeatGrade, nullable: true, default: SeatGrade.BRONZE })
  grade: SeatGrade;

  @Column()
  price: number;

  @Column()
  row: string;

  @Column()
  column: number;
}
