import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

type config = {
  host: string;
  port: number;
  user: string;
  pass: string;
  logger: boolean;
  fromAddress: string;
  fromName: string;
  requireTLS: boolean;
};

type sendOptions = {
  from?: string;
  to: string;
  text?: number;
  html?: string;
  subject?: string;
};

@Injectable()
export class MailService {
  config: config;

  constructor(private readonly mailerService: MailerService) {
    const host = process.env.MAIL_HOST;
    const port = Number.parseInt(process.env.MAIL_PORT);
    const encryptionType = process.env.MAIL_ENCRYPTION;
    const user = process.env.MAIL_USERNAME;
    const pass = process.env.MAIL_PASSWORD;
    const logger = process.env.MAIL_LOGGING == 'true';
    const fromAddress = process.env.MAIL_FROM_ADDRESS;
    const fromName = process.env.MAIL_FROM_NAME;

    let requireTLS = false;
    if (encryptionType && encryptionType.toLowerCase() === 'tls')
      requireTLS = true;

    this.config = {
      host,
      port,
      user,
      pass,
      logger,
      fromAddress,
      fromName,
      requireTLS,
    };
  }

  public async welcome(options: sendOptions): Promise<any> {
    return await this.mailerService.sendMail({
      to: options.to,
      from: options.from || this.config.fromAddress,
      subject: options.subject || 'Testing Nest MailerModule ✔',
      text: 'welcome'
      // html: '<b>welcome</b>',
    });
  }

  public async forgotPassword(options: sendOptions): Promise<any> {
    return await this.mailerService.sendMail({
      to: options.to,
      from: options.from || this.config.fromAddress,
      subject: options.subject || 'Testing Nest MailerModule ✔',
      text: 'Why did you forget your password?'
      // html: '<b>welcome</b>',
    });
  }

  public async passwordReset(options: sendOptions): Promise<any> {
    return await this.mailerService.sendMail({
      to: options.to,
      from: options.from || this.config.fromAddress,
      subject: options.subject || 'Testing Nest MailerModule ✔',
      text: 'Your password has been successfully reset.'
      // html: '<b>welcome</b>',
    });
  }

  
}
