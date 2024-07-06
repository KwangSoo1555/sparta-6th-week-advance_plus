import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './typeorm.config';

@Module({
  imports: [NestTypeOrmModule.forRootAsync({
    useClass: TypeOrmConfig,
  })],
})
export class TypeOrmModule {}
