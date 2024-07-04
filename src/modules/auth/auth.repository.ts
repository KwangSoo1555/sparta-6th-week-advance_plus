import { DataSource, Repository } from 'typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { CreateSignUpDto } from 'src/dto/auth.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AuthEntity, dataSource.manager);
  }

  async checkUser(email: string): Promise<AuthEntity> {
    const user = await this.findOne({ where: { email } });
    return user;
  }

  async signUp(signUpDto: CreateSignUpDto): Promise<AuthEntity> {
    const user = this.create(signUpDto);

    await this.save(user);
    return user;
  }
}
