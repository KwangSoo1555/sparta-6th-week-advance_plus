import { IsEnum, IsNumber, IsOptional, IsString, Max } from "class-validator";
import { SeatGrade } from "src/common/constants/enums";

export class SeatDTO {
  @IsNumber()
  showId: number;

  @IsEnum(SeatGrade)
  @IsOptional()
  grade: SeatGrade | null;

  @IsNumber()
  @Max(50000, { message: "가격은 50000 포인트를 초과할 수 없습니다." })
  price: number;

  @IsString()
  row: string;

  @IsNumber()
  column: number;
}
