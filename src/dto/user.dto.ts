import { 
    IsString, 
    IsEmail, 
    MinLength, 
    MaxLength,
    IsEnum,
    IsOptional,
} from "class-validator";
import { Exclude } from "class-transformer";

import { UserRole } from "src/common/constants/enums";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @Exclude({ toPlainOnly: true })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  imgUrl: string;
}

export class UpdateUserPermissionDto {
  @IsEnum(UserRole)
  role: UserRole;
}