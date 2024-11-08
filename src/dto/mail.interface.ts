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
