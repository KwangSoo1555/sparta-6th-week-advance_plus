import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { JwtService } from './jwt.service';
import { JwtRefreshGuard } from './jwt.service';

import { JwtDto } from 'src/dto/jwt.dto';
import { JwtEntity } from 'src/entities/jwt.entity';

@Controller('token-reissue')
export class JwtController {
  constructor(private jwtService: JwtService) {}

  @UseGuards(JwtRefreshGuard)
  @Post()
  @UsePipes(ValidationPipe)
  tokenReissue(
    @Body() jwtDto: JwtDto
  ): Promise<JwtEntity> {
    return this.jwtService.tokenReissue(jwtDto);
  }
}
