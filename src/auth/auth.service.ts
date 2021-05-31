import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { HashService } from 'src/core/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    let user: User = await this.usersService.findUserByEmail(login);
    if (user) {
      //@ts-ignore
      user = user.toJSON();
    }
    console.log(user.password);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
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
