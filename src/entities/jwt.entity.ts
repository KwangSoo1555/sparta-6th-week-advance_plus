import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity()
export class JwtEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  refreshTokenId: number;

  // userId 를 users entity 에서 받아옴
  @ManyToOne(() => UsersEntity, (user) => user.jwt)
  @JoinColumn({ name: 'userId' })
  userId: UsersEntity;

  @Column()
  refreshToken: string;

  @Column()
  ip: string;

  @Column()
  userAgent: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  expiresAt: Date;
}
