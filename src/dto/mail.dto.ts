import { ApiProperty } from '@nestjs/swagger';

export class Mail {
  @ApiProperty({
    example: 'example@mail.com',
  })
  to: string;
  @ApiProperty({
    example: 'Welcome',
  })
  subject: string;
  @ApiProperty({
    example: 'Welcome to our platform',
  })
  text: string;

  [key: string]: any;
}

export class ScheduledMail {
  @ApiProperty({
    example: 'example@mail.com',
  })
  to: string;
  @ApiProperty({
    example: 'Welcome',
  })
  subject: string;
  @ApiProperty({
    example: 'Welcome to our platform',
  })
  text: string;

  @ApiProperty({
    example: '2021-06-01T00:00:00.000Z',
  })
  targetDate: Date;

  [key: string]: any;
}
