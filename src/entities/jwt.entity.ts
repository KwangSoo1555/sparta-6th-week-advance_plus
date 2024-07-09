import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Unique,
} from "typeorm";
import { UserEntity } from "./users.entity";

@Entity("jwt")
@Unique(["userByUserEntity"])
export class JwtEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "refresh_token_id" })
  refreshTokenId: number;

  // userId 를 user 엔티티에서 참조 한다고 해도 참조 받는 엔티티에서 명시해줘야 함
  @Column({ name: "user_id" })
  userId: number;
  // userId 를 users entity 에서 받아옴
  // 일대일, => user 엔티티 호출, (여기서 부를 이름) => 여기서 부를 이름.유저 엔티티에서 불릴 이름
  @OneToOne(() => UserEntity, (userByUserEntity) => userByUserEntity.jwtByJwtEntity)
  @JoinColumn({
    // 외래키 설정 (데이터 베이스에 매핑된 컬럼) prisma 에서는 fields
    name: "user_id",
    // 외래키 설정 (user엔티티에서 가져온 퓨어 컬럼) prisma 에서는 references
    referencedColumnName: "userId",
  })
  // 엔티티 연결
  userByUserEntity: UserEntity;

  @Column({ name: "refresh_token" })
  refreshToken: string;

  @Column({ nullable: true, default: null })
  ip: string;

  @Column({ name: "user_agent", nullable: true, default: null })
  userAgent: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "refresh_token_expires_at" })
  refreshTokenExpiresAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setRefreshTokenExpiresAt() {
    if (!this.refreshTokenExpiresAt) {
      const now = new Date();
      now.setDate(now.getDate() + 7);
      this.refreshTokenExpiresAt = now;
    }
  }
}
