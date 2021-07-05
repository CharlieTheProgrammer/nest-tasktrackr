import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HashModule } from 'src/core/hash/hash.module';
import { MailModule } from 'src/core/mail/mail.module';
import { MailService } from 'src/core/mail/mail.service';
import { UuidModule } from 'src/core/uuid/uuid.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    HashModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
    MailModule,
    UuidModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, MailService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
