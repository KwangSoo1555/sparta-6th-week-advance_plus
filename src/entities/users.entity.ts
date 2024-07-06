import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { JwtEntity } from "./jwt.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // userId 를 jwt entity 외래키로 연결하는 엔티티
  @OneToOne(() => JwtEntity, (jwtByJwtEntity) => jwtByJwtEntity.userByUserEntity)
  jwtByJwtEntity: JwtEntity;
}
