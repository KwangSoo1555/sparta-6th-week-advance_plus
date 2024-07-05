import {
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
  } from 'class-validator';
  
  export class JwtDto {
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
  