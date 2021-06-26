import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

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
  _config: config;

  constructor(private readonly mailerService: MailerService, private config: ConfigService) {
    const host = this.config.get<string>('MAIL_HOST');
    const port = this.config.get<number>('MAIL_PORT');
    const encryptionType =this.config.get<string>('MAIL_ENCRYPTION');
    const user = this.config.get<string>('MAIL_USERNAME');
    const pass = this.config.get<string>('MAIL_PASSWORD');
    const logger = this.config.get<boolean>('MAIL_LOGGING');
    const fromAddress = this.config.get<string>('MAIL_FROM_ADDRESS');
    const fromName = this.config.get<string>('MAIL_FROM_NAME');

    let requireTLS = false;
    if (encryptionType && encryptionType.toLowerCase() === 'tls')
      requireTLS = true;

    this._config = {
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
      from: options.from || this._config.fromAddress,
      subject: options.subject || 'Testing Nest MailerModule ✔',
      text: 'welcome'
      // html: '<b>welcome</b>',
    });
  }

  public async forgotPassword(options: sendOptions): Promise<any> {
    return await this.mailerService.sendMail({
      to: options.to,
      from: options.from || this._config.fromAddress,
      subject: options.subject || 'Testing Nest MailerModule ✔',
      text: 'Why did you forget your password?'
      // html: '<b>welcome</b>',
    });
  }

  public async passwordReset(options: sendOptions): Promise<any> {
    return await this.mailerService.sendMail({
      to: options.to,
      from: options.from || this._config.fromAddress,
      subject: options.subject || 'Testing Nest MailerModule ✔',
      text: 'Your password has been successfully reset.'
      // html: '<b>welcome</b>',
    });
  }

  
}
