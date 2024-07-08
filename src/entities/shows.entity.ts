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
} from "typeorm";

import { UserEntity } from "./users.entity";
import { SeatEntity } from "./seat.entity";

@Entity("show")
export class ShowEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "show_id" })
  showId: number;

  // userId 를 users entity 에서 받아옴
  // 일대일, => user 엔티티 호출, (여기서 부를 이름) => (여기서 부를 이름).유저 엔티티에서 불릴 이름
  @ManyToOne(() => UserEntity, (userByUserEntity) => userByUserEntity.showByShowEntity)
  @JoinColumn({
    // 외래키 설정 (데이터 베이스에 매핑된 컬럼) prisma 에서는 fields
    name: "user_id",
    // 외래키 설정 (user엔티티에서 가져온 퓨어 컬럼) prisma 에서는 references
    referencedColumnName: "userId",
  })
  // 엔티티 연결
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
