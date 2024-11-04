import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConsumer } from 'src/email.consumer';

@Module({
  providers: [EmailService, EmailConsumer], // Ensure EmailConsumer is included
  exports: [EmailService],
})
export class EmailModule {}
