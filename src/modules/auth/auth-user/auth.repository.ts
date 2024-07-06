import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { CreateSignUpDto } from "src/dto/auth.dto";
import { UserEntity } from "src/entities/users.entity";

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  async checkUser(email: string): Promise<UserEntity> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }

  async signUp(signUpDto: CreateSignUpDto): Promise<UserEntity> {
    const user = this.create(signUpDto);

    await this.save(user);
    return user;
  }
}
