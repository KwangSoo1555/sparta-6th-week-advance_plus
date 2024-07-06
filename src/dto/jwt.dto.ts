import {
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
  } from 'class-validator';

  import { UserEntity } from 'src/entities/users.entity';
  
  export class JwtDto {
    userByUserEntity: UserEntity;

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    refreshToken: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    ip?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    userAgent?: string;
  }
  