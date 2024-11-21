import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Movie, MovieSchema} from "./movie.model";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {FilesModule} from "../files/file.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema}]),
  UserModule, JwtModule, FilesModule],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
