import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth-user/auth.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserEntity } from 'src/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
