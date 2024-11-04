import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EMAIL_QUEUE } from './constants';
import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import { EMAIL_CONFIG_OPTIONS } from './email/email.module-definition';
import EmailOptions from './email/emailOptions.interface';

@Processor(EMAIL_QUEUE)
export class EmailConsumer {
  private nodemailerTransport: Mail;
  private readonly logger = new Logger(EmailConsumer.name);

  constructor(@Inject(EMAIL_CONFIG_OPTIONS) private options: EmailOptions) {
    this.nodemailerTransport = createTransport({
      service: options.service,
      auth: {
        user: options.user,
        pass: options.password,
      },
    });
  }

  @Process()
  async handleEmailJob(
    job: Job<{ to: string; subject: string; text: string }>,
  ) {
    const { to, subject, text } = job.data;
    this.logger.log(`Sending email to ${to} with subject "${subject}"`);
    try {
      await this.nodemailerTransport.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      });
      this.logger.log(`Email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
    }
  }
}
