import { 
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";

import { JwtService } from "src/modules/auth/jwt/jwt.service";
import { JwtRefreshGuard } from "src/modules/auth/jwt/jwt.service";

import { JwtDto } from "src/dto/jwt.dto";
import { JwtEntity } from "src/entities/jwt.entity";

@Controller("auth")
export class JwtController {
  constructor(private jwtService: JwtService) {}

  @UseGuards(JwtRefreshGuard)
  @Post("jwt-reissue")
  @UsePipes(ValidationPipe)
  tokenReissue(
    @Body() jwtDto: JwtDto,
  ): Promise<JwtEntity> {
    return this.jwtService.tokenReissue(jwtDto);
  }
}

