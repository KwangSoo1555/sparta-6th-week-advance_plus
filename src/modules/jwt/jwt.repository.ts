import { DataSource, Equal, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { JwtDto } from 'src/dto/jwt.dto';
import { JwtEntity } from '../../entities/jwt.entity';

@Injectable()
export class JwtRepository extends Repository<JwtEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(JwtEntity, dataSource.manager);
  }

  async checkJwt(userId: number): Promise<JwtEntity> {
    const jwt = await this.findOne({ where: { userId: Equal(userId) } });
    return jwt;
  }

  // auth.service.ts 에서 호출 (로그인 하면 refresh token 을 저장하는 용도)
  async refreshTokenStore(refreshToken: JwtDto): Promise<JwtEntity> {
    const user = this.create(refreshToken);

    await this.save(user);
    return user;
  }

  // jwt.service.ts 에서 호출 (refresh token 을 검증하는 용도)
  async tokenReissue(jwtDto: JwtDto): Promise<JwtEntity> {
    const jwt = await this.findOne({ where: { refreshToken: jwtDto.refreshToken } });
    return jwt;
  }
}
