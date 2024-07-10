import { 
  IsNotEmpty, 
  IsString,
  MinLength,
  MaxLength,
  IsOptional
} from "class-validator";

export class CreateShowDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  place: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  runtime: string;

  @IsNotEmpty()
  @IsString()
  actor: string;

  @IsNotEmpty()
  @IsString()
  imgUrl: string;
}

export class UpdateShowDto extends CreateShowDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsString()
  place: string;

  @IsOptional()
  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  runtime: string;

  @IsOptional()
  @IsString()
  actor: string;

  @IsOptional()
  @IsString()
  imgUrl: string;
}