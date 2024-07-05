import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { JwtEntity } from './jwt.entity';

@Entity()
export class UsersEntity extends BaseEntity {
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

  // userId 를 jwt entity 외래키로 연결하는 엔티티
  @OneToMany(() => JwtEntity, (jwt) => jwt.userId)
  jwt: JwtEntity[];
}
