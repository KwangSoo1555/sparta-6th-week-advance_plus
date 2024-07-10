import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { JwtEntity } from "src/entities/jwt.entity";

@Injectable()
export class JwtRepository extends Repository<JwtEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(JwtEntity, dataSource.manager);
  }

  async checkRefreshToken(
    userId: number
  ): Promise<JwtEntity> {
    const jwt = await this.findOne({
      where: { user: { userId } },
    });
    return jwt;
  }

  // auth.service.ts 에 sign-in 에서 호출 (로그인 하면 refresh token 만 저장하는 용도)
  async storeRefreshToken(
    userId: number, 
    refreshToken: string,
    ip: string,
    userAgent: string,
  ) {
    await this.upsert(
      { userId, refreshToken, ip, userAgent },
      {
        conflictPaths: ["userId"],
        skipUpdateIfNoValuesChanged: true,
      },
    );

    const storedRefreshToken = await this.findOne({
      where: { userId: userId },
    });
    return storedRefreshToken;
  }

  // jwt.service.ts 에서 호출 (refresh token 을 검증하는 용도)
  async restoreRefreshToken(userId: number, refreshToken: string, ip: string, userAgent: string) {
    return await this.save({ userId, refreshToken, ip, userAgent });
  }
}
