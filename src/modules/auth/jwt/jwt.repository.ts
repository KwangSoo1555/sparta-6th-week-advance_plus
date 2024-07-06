import { DataSource, Equal, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { JwtDto } from "src/dto/jwt.dto";
import { JwtEntity } from "src/entities/jwt.entity";

@Injectable()
export class JwtRepository extends Repository<JwtEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(JwtEntity, dataSource.manager);
  }

  async checkJwt(userId: number): Promise<JwtEntity> {
    const jwt = await this.findOne({
      where: { userByUserEntity: { userId } },
    });
    return jwt;
  }

  // auth.service.ts 에 sign-in 에서 호출 (로그인 하면 refresh token 만 저장하는 용도)
  async refreshTokenStore(jwtDto: JwtDto): Promise<JwtEntity> {
    const existingJwt = await this.checkJwt(jwtDto.userByUserEntity.userId);

    if (existingJwt) {
      existingJwt.updatedAt = new Date();
      return await this.save(existingJwt);
    } else {
      return await this.save(jwtDto);
    }
  }

  // jwt.service.ts 에서 호출 (refresh token 을 검증하는 용도)
  async tokenReissueAndRestoreRefreshToken(jwtDto: JwtDto): Promise<JwtEntity> {
    return await this.save(jwtDto);
  }
}
