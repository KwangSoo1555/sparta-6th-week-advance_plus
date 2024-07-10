import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserModule } from 'src/modules/auth/auth-user/auth-user.module';

import { AuthUserRepository } from 'src/modules/auth/auth-user/auth-user.repository';

import { UserController } from 'src/modules/user/user-info/user-info.controller';
import { UserService } from 'src/modules/user/user-info/user-info.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUserRepository]), 
    AuthUserModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserInfoModule {}
