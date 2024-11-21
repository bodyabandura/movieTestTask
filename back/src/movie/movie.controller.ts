import {
	Controller,
	Post,
	Get,
	Body,
	Param,
	Query,
	Delete,
	UseInterceptors,
	UploadedFile,
	UseGuards, Patch, UsePipes
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovieService } from './movie.service';
import { Movie } from './movie.model';
import { authGuard } from "../guards/auth.guard";
import {CreateMovieDTO} from "./dtos/create.movie.dto";
import {ValidatorPipes} from "../pipes/validation.pipe";

@UseGuards(authGuard)
@Controller('movies')
@ApiTags('Movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Post()
	@UsePipes(ValidatorPipes)
	@ApiOperation({ summary: 'Create a new movie' })
	@ApiResponse({ status: 201, description: 'Movie successfully created', type: Movie })
	@UseInterceptors(FileInterceptor('poster'))
	async create(
		@Body() createMovieDto: CreateMovieDTO,
		@UploadedFile() poster,
	):Promise<Movie> {
		return this.movieService.create(createMovieDto, poster);
	}

	@Get()
	@ApiOperation({ summary: 'Get all movies with pagination' })
	@ApiResponse({ status: 200, description: 'List of all movies', type: [Movie] })
	async findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 8,
	):Promise<Movie[]> {
		return this.movieService.findAll(page, limit);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a movie by its ID' })
	@ApiResponse({ status: 200, description: 'The movie found by ID', type: Movie })
	@ApiResponse({ status: 404, description: 'Movie not found' })
	@ApiParam({ name: 'id', description: 'ID of the movie' })
	findOne(@Param('id') id: string):Promise<Movie>{
		return this.movieService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update a movie by ID' })
	@ApiResponse({ status: 200, description: 'The movie has been updated', type: Movie })
	@ApiResponse({ status: 404, description: 'Movie not found' })
	@ApiParam({ name: 'id', description: 'ID of the movie' })
	@UseInterceptors(FileInterceptor('poster'))
	async update(
		@Param('id') id: string,
		@Body() updateMovieDto: Partial<CreateMovieDTO>,
		@UploadedFile() poster?: Express.Multer.File,
	):Promise<Movie> {
		return this.movieService.update(id, updateMovieDto, poster || null);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a movie by ID' })
	@ApiResponse({ status: 200, description: 'The movie has been deleted' })
	@ApiResponse({ status: 404, description: 'Movie not found' })
	@ApiParam({ name: 'id', description: 'ID of the movie' })
	async delete(@Param('id') id: string):Promise<void> {
		return this.movieService.delete(id);
	}
}
