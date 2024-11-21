import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.model";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(()=>AuthModule), JwtModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
