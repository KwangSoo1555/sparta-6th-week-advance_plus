import { 
    IsString, 
    IsEmail, 
    MinLength, 
    MaxLength,
    IsEnum
} from "class-validator";
import { UserRole } from "src/common/constants/enums";
import { Exclude } from "class-transformer";

import { UserEntity } from "src/entities/users.entity";

export class UpdateUserDto {
  userByUserEntity: UserEntity;
  
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsString()
  @MaxLength(255)
  name?: string;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  password?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(15)
  phone?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  address?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  imgUrl?: string;
}

export class UpdateUserPermissionDto {
  @IsEnum(UserRole)
  role: UserRole;
}