import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Mail, ScheduledMail } from './dto/mail.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('email')
@ApiTags('email')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-welcome')
  @ApiResponse({
    status: 201,
    description: 'The email has been successfully sent.',
  })
  async sendWelcome(@Body() data: Mail) {
    return await this.appService.sendWelcomeEmail(data);
  }

  @Post('send-reset')
  async sendReset(@Body() data: Mail) {
    return await this.appService.sendResetPasswordEmail(data);
  }

  @Post('schedule')
  async scheduleEmail(@Body() data: ScheduledMail) {
    return await this.appService.scheduleEmailAt(data);
  }
}
