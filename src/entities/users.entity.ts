import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";

import { JwtEntity } from "src/entities/jwt.entity";
import { ShowEntity } from "src/entities/shows.entity";

import { UserRole } from "src/common/constants/enums";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @Column({ default: 1000000 })
  point: number;

  @Column({ name: "img_url", default: null })
  imgUrl: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // userId 를 jwt entity 외래키로 연결하는 엔티티
  @OneToOne(() => JwtEntity, (jwtByJwtEntity) => jwtByJwtEntity.userByUserEntity)
  jwtByJwtEntity: JwtEntity;

  // userId 를 show entity 외래키로 연결하는 엔티티
  @OneToMany(() => ShowEntity, (showByShowEntity) => showByShowEntity.userByUserEntity)
  showByShowEntity: ShowEntity[];
}
