import { IsEnum, IsNumber, IsNotEmpty, IsOptional, IsString, Max } from "class-validator";
import { SeatGrade } from "src/common/constants/enums";

export class CreateReservationDto {
  @IsNotEmpty()
  @IsEnum(SeatGrade)
  grade: SeatGrade;

  @IsString()
  row: string;

  @IsNumber()
  column: number;
}

export class UpdateReservationDto extends CreateReservationDto {
  @IsOptional()
  @IsEnum(SeatGrade)
  grade: SeatGrade;

  @IsOptional()
  @IsString()
  row: string;

  @IsOptional()
  @IsNumber()
  column: number;
}
