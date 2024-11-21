import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie.model';
import {UserService} from "../user/user.service";
import {FilesService} from "../files/file.service";
import {CreateMovieDTO} from "./dtos/create.movie.dto";

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(Movie.name) private movieModel: Model<Movie>,
		private readonly userService: UserService,
		private readonly fileService: FilesService
	) {}

	async create(createMovieDto: CreateMovieDTO, poster): Promise<Movie> {
		const posterPath = await this.fileService.CreateFile(poster)
		const newMovie = new this.movieModel({ ...createMovieDto, poster: posterPath });
		await newMovie.save();
		return newMovie;
	}

	async findAll(page: number, limit: number): Promise<any> {
		const movies = await this.movieModel
			.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.exec();
		const totalCount = await this.movieModel.countDocuments().exec();
		return {
			data: movies,
			totalCount,
			page,
			limit,
		};
	}

	async findOne(id: string): Promise<Movie> {
		return this.movieModel.findById(id).exec();
	}

	async update(id: string, updateMovieDto: Partial<CreateMovieDTO>, poster): Promise<Movie> {
		if (poster) {
			const posterPath = await this.fileService.CreateFile(poster)
			updateMovieDto = {...updateMovieDto, poster: posterPath}
		}
		const movie = await this.movieModel.findByIdAndUpdate(id, updateMovieDto, {new: true}).exec();
		if (!movie) {
			throw new NotFoundException('Movie not found');
		}
		return movie;
	}

	async delete(id: string): Promise<void> {
		const movie = await this.movieModel.findByIdAndDelete(id).exec();
		if (!movie) {
			throw new NotFoundException('Movie not found');
		}
	}
}