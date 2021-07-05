import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { HashService } from 'src/core/hash/hash.service';
import { MailService } from 'src/core/mail/mail.service';
import { UuidService } from 'src/core/uuid/uuid.service';
import { ErrorResponse } from 'src/core/responses/errorResponse';
import { SuccessfulResponse } from 'src/core/responses/successfulResponse';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sendMail: MailService,
    private uuidService: UuidService
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    let user: User = await this.usersService.findUserByEmail(login);
    if (user) {
      //@ts-ignore
      user = user.toJSON();
    }
    
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async requestPasswordReset(login: string) {
    // find the user by email and if it exists, 
    let user: User = await this.usersService.findUserByEmail(login);
    if (!user) {
      const error: ErrorResponse = {
        statusCode: 400,
        error: 'Your email account was not found.',
        timestamp: new Date(),
        path: 'auth/request-password-reset'
      };
      return error;
    };

    user.passwordResetToken = await UuidService.make();
    user.save();
    
    await this.sendMail.passwordReset({
      to: user.email
    }, user);
    
    const message : SuccessfulResponse = {
      statusCode: 200,
      message: `We've sent an email to ${user.email}. Please check your inbox and click on the link to reset your password.`,
      timestamp: new Date(),
      path: 'auth/request-password-reset'
    };
    return message;
  }

  async resetPassword(login: string, pass: string, newPass: string) {
    let user: User = await this.usersService.findUserByEmail(login);
    if (user) {
      user.password = await HashService.make(pass);
      await user.save();
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
