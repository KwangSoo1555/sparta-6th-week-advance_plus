import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { ShowEntity } from "./shows.entity";
import { ReservationEntity } from "./reservation.entity";
import { SeatGrade } from "src/common/constants/enums";

@Entity("seat")
export class SeatEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "seat_id" })
  seatId: number;

  @ManyToOne(() => ShowEntity, (show) => show.seat)
  @JoinColumn({
    name: "show_id",
    referencedColumnName: "showId",
  })
  show: ShowEntity;

  @Column({ type: "enum", enum: SeatGrade, nullable: true, default: SeatGrade.BRONZE })
  grade: SeatGrade;

  @Column()
  price: number;

  @Column()
  row: string;

  @Column()
  column: number;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.seat)
  reservation: ReservationEntity[];
}
