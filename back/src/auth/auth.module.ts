import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=>UserModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'test_secret',
      signOptions: { expiresIn: '48h' },
    }),
  ],
})
export class AuthModule {}
