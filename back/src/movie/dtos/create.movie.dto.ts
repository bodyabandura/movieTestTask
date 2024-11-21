import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, Length} from "class-validator";

export class CreateMovieDTO {
	@ApiProperty({example: "Hungry Games", required: true})
	@Length(4, 128,{ message: "Length of Password must be > 3 and < 128"})
	@IsString({message: "name must be string"})
	readonly title: string


	@ApiProperty({example: 2023, required: true})
	readonly publishingYear: number

	@ApiProperty({
		example: 'http://example.com/path/to/poster.jpg',
	})
	@IsString()
	@IsOptional()
	poster?: string;
}