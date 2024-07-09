import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Unique,
} from "typeorm";

import { UserEntity } from "./users.entity";
import { SeatEntity } from "./seats.entity";

@Entity("show")
@Unique(["userByUserEntity"])
export class ShowEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "show_id" })
  showId: number;

  @ManyToOne(() => UserEntity, (userByUserEntity) => userByUserEntity.showByShowEntity)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "userId",
  })
  userByUserEntity: UserEntity;

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

  @OneToOne(() => SeatEntity, (seatBySeatEntity) => seatBySeatEntity.showByShowEntity)
  seatBySeatEntity: SeatEntity;
}
