import { 
  Controller, 
  Body, 
  Post, 
  UsePipes,
  ValidationPipe
} from '@nestjs/common';

import { AuthEmailService } from './auth-email.service';
import { SendAuthEmailDto } from '../../dto/auth-email.dto';

@Controller('auth')
export class AuthEmailController {
  constructor(private authEmailService: AuthEmailService) {}

  @Post('send-email')
  @UsePipes(ValidationPipe)
  async sendAuthEmail(
    @Body() sendAuthEmailDto: SendAuthEmailDto
  ) {
    return this.authEmailService.sendAuthEmail(sendAuthEmailDto);
  }
}
