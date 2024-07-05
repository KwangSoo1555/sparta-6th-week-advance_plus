import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CreateSignUpDto } from 'src/dto/auth.dto';
import { UsersEntity } from '../../entities/users.entity';

@Injectable()
export class AuthRepository extends Repository<UsersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UsersEntity, dataSource.manager);
  }

  async checkUser(
    email: string
  ): Promise<UsersEntity> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }

  async signUp(
    signUpDto: CreateSignUpDto
  ): Promise<UsersEntity> {
    const user = this.create(signUpDto);

    await this.save(user);
    return user;
  }
}
