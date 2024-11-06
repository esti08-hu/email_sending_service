import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EMAIL_QUEUE } from './constants';

@Injectable()
export class AppService {
  constructor(@InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue) {}

  getHello(): string {
    return 'Hello, Email Service!';
  }

  async sendEmail(emailDetails: { to: string; subject: string; text: string }) {
    await this.emailQueue.add(emailDetails);
    console.log('Job added to the email queue:', emailDetails);
    return { message: 'Email job added to the queue' };
  }
}
