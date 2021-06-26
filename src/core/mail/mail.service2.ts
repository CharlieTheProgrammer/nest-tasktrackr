import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

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
  text: number;
  html?: string;
  subject: string;
};


export class MailService {
  Mail: Mail;
  transporter;
  config: config;

  constructor() {
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

    
    this.transporter = nodemailer.createTransport({
      //@ts-ignore
      host,
      port,
      secure: false,
      requireTLS,
      auth: {
        user,
        pass,
      },
      logger: true,
    });

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

  async send(options: sendOptions) {
    const info = await this.transporter.sendMail({
      from: options.from || this.config.fromAddress,
      to: options.to,
      subject: options.subject,
      text: options.text,
      // html: '<strong>Hello world?</strong>',
      // headers: { 'x-myheader': 'test header' },
    });

    console.log('Message sent: %s', info.response);
  }
}
