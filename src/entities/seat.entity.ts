import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { ShowEntity } from "./shows.entity";
import { SeatGrade } from "src/common/constants/enums";

@Entity("seat")
export class SeatEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "seat_id" })
  seatId: number;

  @ManyToOne(() => ShowEntity, (showByShowEntity) => showByShowEntity.seatBySeatEntity)
  @JoinColumn({
    name: "show_id",
    referencedColumnName: "showId",
  })
  showByShowEntity: ShowEntity;

  @Column({ type: "enum", enum: SeatGrade, nullable: true, default: SeatGrade.BRONZE })
  grade: SeatGrade;

  @Column()
  price: number;

  @Column()
  row: string;

  @Column()
  column: number;
}
