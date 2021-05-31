import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HashModule } from 'src/core/hash/hash.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    HashModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
