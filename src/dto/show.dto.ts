import { 
  IsNotEmpty, 
  IsString, 
  IsNumber,
  IsEmail, 
  MinLength, 
  MaxLength 
} from "class-validator";

import { UserEntity } from "src/entities/users.entity";

export class CreateShowDto {
  userByUserEntity: UserEntity;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  place: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  genre: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  startDate: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  runtime: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  actor: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  imgUrl: string;
}

export class UpdateShowDto extends CreateShowDto {
  @IsNotEmpty()
  @IsNumber()
  showId: number;
}