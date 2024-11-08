import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mail } from './dto/mail.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            sendWelcomeEmail: jest.fn(),
            sendResetPasswordEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('sendWelcome', () => {
    it('should call sendWelcomeEmail with correct data', async () => {
      const mockMailData: Mail = {
        from: 'sender@example.com',
        to: 'recipient@example.com',
        subject: 'Welcome',
        text: 'Welcome to our service!',
      };

      await appController.sendWelcome(mockMailData);

      expect(appService.sendWelcomeEmail).toHaveBeenCalledWith(mockMailData);
    });
  });

  describe('sendReset', () => {
    it('should call sendResetPasswordEmail with correct data', async () => {
      const mockMailData: Mail = {
        from: 'sender@example.com',
        to: 'recipient@example.com',
        subject: 'Reset Password',
        text: 'Please reset your password using the following link.',
      };

      await appController.sendReset(mockMailData);

      expect(appService.sendResetPasswordEmail).toHaveBeenCalledWith(mockMailData);
    });
  });
});
