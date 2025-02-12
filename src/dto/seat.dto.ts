import {
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
} from "class-validator";
import { SeatGrade } from "src/common/constants/enums";

export class CreateSeatDto {
  @IsNotEmpty()
  @IsEnum(SeatGrade)
  grade: SeatGrade;

  @IsNumber()
  @Max(50000, { message: "가격은 50000 포인트를 초과할 수 없습니다." })
  price: number;

  @IsString()
  row: string;

  @IsNumber()
  column: number;
}

export class UpdateSeatDto extends CreateSeatDto {
  @IsOptional()
  @IsEnum(SeatGrade)
  grade: SeatGrade;

  @IsOptional()
  @IsNumber()
  @Max(50000, { message: "가격은 50000 포인트를 초과할 수 없습니다." })
  price: number;

  @IsOptional()
  @IsString()
  row: string;

  @IsOptional()
  @IsNumber()
  column: number;
}
