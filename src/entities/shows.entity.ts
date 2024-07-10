import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { UserEntity } from "./users.entity";
import { SeatEntity } from "./seats.entity";
import { ReservationEntity } from "./reservation.entity";

@Entity("show")
export class ShowEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "show_id" })
  showId: number;

  @ManyToOne(() => UserEntity, (user) => user.show)
  @JoinColumn({ name: "user_id", referencedColumnName: "userId"})
  user: UserEntity;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  place: string;

  @Column()
  genre: string;

  @Column({ name: "start_date" })
  startDate: string;

  @Column()
  runtime: string;

  @Column()
  actor: string;

  @Column({ name: "img_url" })
  imgUrl: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => SeatEntity, (seat) => seat.show)
  seat: SeatEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.show)
  reservation: ReservationEntity;
}
