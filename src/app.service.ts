import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Mail, ScheduledMail } from './dto/mail.dto';
import { EMAIL_QUEUE } from './constant';

@Injectable()
export class AppService {
  constructor(@InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue) {}

  async sendEmail(data: Mail) {
    const job = await this.emailQueue.add({ data });
    return { jbId: job.id };
  }

  async sendWelcomeEmail(data: Mail) {
    const job = await this.emailQueue.add('welcome', { data });
    return { jobId: job.id };
  }

  async sendResetPasswordEmail(data: Mail) {
    const job = await this.emailQueue.add('reset-password', { data });
    return { jobId: job.id };
  }

  async scheduleEmailAt(data: ScheduledMail) {
    const targetDate = new Date(data.targetDate);
    if (!targetDate.getTime()) {
      throw new BadRequestException('Invalid target date');
    }
    const delay = targetDate.getTime() - new Date().getTime();
    console.log(delay);
    if (delay > 0) {
      await this.emailQueue.add('sendEmail', data, { delay });
      return { message: `Email scheduled for ${data.targetDate}.` };
    }
    throw new BadRequestException('Target date must be in the future.');
  }
}
