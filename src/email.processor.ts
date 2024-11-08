import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Mail } from './dto/mail.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import { EMAIL_QUEUE } from './constant';

@Processor(EMAIL_QUEUE)
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly mailService: MailerService) {}

  @Process('welcome')
  async sendWelcomeEmail(job: Job<Mail>) {
    const { data } = job.data;
    this.logger.log(`Processing welcome email for: ${data.to}`);

    try {
      await this.mailService.sendMail({
        from: process.env.EMAIL_USER,
        to: data.to,
        subject: data.subject,
        text: data.text,
        template: 'welcome',
        context: { user: data.user },
      });

      this.logger.log(`Welcome email sent successfully to ${data.to}`);
    } catch (error) {
      this.logger.error(
        `Failed to send welcome email to ${data.to}: ${error.message}`,
      );
    }
  }

  @Process('reset-password')
  async sendResetPasswordEmail(job: Job<Mail>) {
    const { data } = job.data;
    this.logger.log(`Processing reset password email for: ${data.to}`);

    try {
      await this.mailService.sendMail({
        from: process.env.EMAIL_USER,
        to: data.to,
        subject: data.subject,
        text: data.text,
        template: 'reset-password',
        context: { user: data.user },
      });

      this.logger.log(`Reset password email sent successfully to ${data.to}`);
    } catch (error) {
      this.logger.error(
        `Failed to send reset password email to ${data.to}: ${error.message}`,
      );
    }
  }
}
