import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Mail } from './dto/mail.interface';
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
}
