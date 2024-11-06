import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Mail } from './dto/mail.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-welcome')
  async sendWelcome(@Body() data: Mail) {
    await this.appService.sendWelcomeEmail(data);
  }

  @Post('send-reset')
  async sendReset(@Body() data: Mail) {
    await this.appService.sendResetPasswordEmail(data);
  }
}
