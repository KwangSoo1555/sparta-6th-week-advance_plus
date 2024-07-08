import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { JwtEntity } from "src/entities/jwt.entity";
import { JwtDto } from "src/dto/jwt.dto";

@Injectable()
export class JwtRepository extends Repository<JwtEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(JwtEntity, dataSource.manager);
  }

  async checkRefreshToken(
    userId: number
  ): Promise<JwtEntity> {
    const jwt = await this.findOne({
      where: { userByUserEntity: { userId } },
    });
    return jwt;
  }

  // auth.service.ts 에 sign-in 에서 호출 (로그인 하면 refresh token 만 저장하는 용도)
  async refreshTokenStore(
    jwtDto: JwtDto
  ): Promise<JwtEntity> {
    await this.upsert(jwtDto, {
      conflictPaths: ["userByUserEntity"],
      skipUpdateIfNoValuesChanged: true,
    });

    const refreshToken = await this.findOne({
      where: { userByUserEntity: { userId: jwtDto.userByUserEntity.userId } },
    });
    return refreshToken;
  }

  // jwt.service.ts 에서 호출 (refresh token 을 검증하는 용도)
  async tokenReissueAndRestoreRefreshToken(
    jwtDto: JwtDto
  ): Promise<JwtEntity> {
    return await this.save(jwtDto);
  }
}
