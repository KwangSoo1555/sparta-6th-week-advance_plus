import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtRepository } from './jwt.repository';
import { JwtService } from './jwt.service';
import { JwtController } from './jwt.controller';

import { JwtEntity } from '../../entities/jwt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JwtEntity])],
  controllers: [JwtController],
  providers: [JwtService, JwtRepository],
})
export class JwtModule {}
