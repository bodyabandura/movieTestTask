import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Movie extends Document {
	@ApiProperty({ example: 'Inception', description: 'The title of the movie' })
	@Prop({ required: true })
	title: string;

	@ApiProperty({ example: 2010, description: 'The publishing year of the movie' })
	@Prop({ required: true })
	publishingYear: number;

	@ApiProperty({
		example: 'http://example.com/path/to/poster.jpg',
		description: 'The poster image URL of the movie',
	})
	@Prop({ required: true })
	poster: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);